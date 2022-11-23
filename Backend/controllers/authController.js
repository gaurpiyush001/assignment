//Here we'll do all User Related Stuff/////////////////////////////////
const { promisify } = require('util'); //util module use for promisifying a function
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
// const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const signToken = id => {
  return jwt.sign(
    { id } /*Payload*/,
    process.env.JWT_SECRET /*secret-Key_32-char-long*/,
    {
      expiresIn: '7h'
    }
  );
};

exports.signup = async (req, res, next) => {
  console.log('signiningggggggggggg');
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.confirmPassword
    // passwordChangedAt: req.body.passwordChangedAt
    //   ? req.body.passwordChangedAt
    //   : undefined,
  });

  // const url = `${req.protocol}://${req.get('host')}/me`;
//   await new Email(newUser, url).sendWelcome();

  // ------------------------IMPLEMENTING AUTHENTICATION-----------------------------//

  // 1.) Creating a unique JWT, during signup
  const token = jwt.sign(
    { id: newUser._id } /*Payload*/,
    process.env.JWT_SECRET /*secret-Key_32-char-long*/,
    /*Options*/ {
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  );

  //Using Http Only coockie so that noone have access to modify the JWT
  res.cookie('jwt', token, {
    //browser or the client will delete the cookie after it has expired
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    //secure: true /*Cookie will only be send to an encrypted Connection means https connection only in production it will work*/,
    httpOnly: true
  });

  newUser.password = undefined; //by this it will not show in output,but will go to db
  // token headers are craeted automatically
  //sending response to user
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  });
};

exports.login = async (req, res, next) => {

  const { email, password } = req.body;

  // 1.) Check or Verify requested Email and Password exist or not in user request body data
//   if (!email || !password) {
//     return next(
//       new AppError('Please provide email and password!', 400 /*Bad Request*/)
//     );
//   }

  // 2.) check if user exist && password is correct
  const user = await User.findOne({ email }).select(
    '+password'
  ); /*explicitly selecting password*/

  //Comparing decrypted password of database with that given by the user in request(Done in Modal)
  // if(user.password === password)
  //const correct = await user.correctPassword(password, user.password);

  if (!user || !(await user.correctPassword(password, user.password)) ) {
    console.log('I spoasswod wrong');
    return next(new Error('Incorrect email or password', 401));
  }

  // 3.) If everything ok, send unique token to client
  const token = signToken(user._id);

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true 
  });


  user.password = undefined;

  res.status(200).json({
    data: user,
    status: 'Success',
    token
  });
};

exports.logout = (req, res) => {
  console.log('logouttt')
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
};

exports.protect = async (req, res, next) => {
  //Getting Token from user and check if its there in request body
  //send a token using an http header with the request OR by a cookie
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // console.log('yes token haii!!');
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    //now we are also able to authenticate users based on tokens send by a coookie and not only the authorization header
    token = req.cookies.jwt;
  }

  // console.log(token);

  if (!token) {
    return next(
      new AppError(
        `You are not logged in! Please log in to get access.`,
        401 /*unauthorized*/
      )
    );
  }


  // 2) Verification token(comparing original signature with test signature and checking expiration of token)

  //below function requires a call back function which get executed after token is verified.
  //We will promisify the below function to make it return a Promise.
  const decoded = await promisify(jwt.verify)(
    token /*for accessing header & payload*/,
    process.env.JWT_SECRET /*Inorder to create test signature*/
  );
  // console.log(decoded); //contains three objects => {id, iat, expireAt}

  // 3) If User still exist
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError('The user belonging to this token no longer exists.', 401)
    );
  }

  // 4) Check If user changed password after the JWT was issued
  //implemented in user model by Instance Method
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed assword! Please log in again', 401)
    );
  }

  //GRANT ACCES TO PROTECTED ROUTE
  req.user = freshUser;
  res.locals.user = freshUser;
  // console.log(req);
  next();
};

//This middleware is reponsible for checking If user logged in or NOT?? and accordingly updating the templates from backend, this middeware function is going to be running on each and every request
exports.isLoggedIn = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      // 1) verifies the token getting from cookie with the request--signature checking
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt /*for accessing header & payload*/,
        process.env.JWT_SECRET /*Inorder to create test signature*/
      );


      // 3) If User still exist
      const freshUser = await User.findById(decoded.id);
      if (!freshUser) {
        return next();
      }

      // 4) Check If user changed password after the JWT was issued
      //implemented in user model by Instance Method
      if (freshUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      res.users = freshUser;
      res.locals.user = freshUser;
      // console.log(req);
      return next();
    }
  } catch (err) {
    return next();
  }
  next();
};

// Example of implementing of passing arguments to a Middleware Function
// Generally we are not able to pass arguments to middleware function, but we can do so by a wrapper function
// exports.restrictTo = (...roles) => {
//   return (req, res, next) => {
//     //roles is an array of parameters passed
//     // console.log(req.user)
//     // console.log(roles, req.user.role);
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new AppError('You do not have permission to perform this action', 403)
//       );
//     }
//     next();
//   };
// };

// Basic Idea -> We just need to provide out emailAddress and we will then get an email ,
//in that we will be having a link on clicking that its gonna take us to page, where we can put a new Password
// exports.forgotPassword = catchAsync(async (req, res, next) => {
//   console.log('In forgot Password controller');
//   //1.) Get user based on POSTED email
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) {
//     return next(new AppError('There is no user with email address', 404));
//   }
//   //2.) Generate the random token not a Json web Token(will do in Instance Methods in model)
//   const resetToken = user.createPasswordResetToken();
//   console.log(resetToken, 'In authController after executing InstanceMethod');
//   const newUser = await user.save(
//     {
//       validateBeforeSave: false
//     } /*this option will deactivaet all the validators that we set in Our Schema*/
//   ); //saving the modified Document

//   //3.) Send it to user's email
//   const resetURL = `${req.protocol}://${req.get(
//     'host'
//   )}/api/v1/users/resetPassword/${resetToken}`;

//   //const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you did'nt forget your password, please ignore this e-mail`;

//   try {
//     // await sendEmail({
//     //   email: user.email,
//     //   subject: 'Your PASSWORD RESET TOKEN (valid for 10min)',
//     //   message
//     // });
//     await new Email(newUser, resetURL).sendPasswordReset();

//     res.status(200).json({
//       status: 'success',
//       message: 'Token sent to email '
//     });
//   } catch (err) {
//     console.log(err);
//     user.passwordResetToken = undefined;
//     user.passwordResetExpires = undefined;
//     await user.save({ validateBeforeSave: false });

//     return next(
//       new AppError('There was an error sending the email. Try Again later!'),
//       500 /*server error*/
//     );
//   }
// });

//Password Reset Functionality
// exports.resetPassword = async (req, res, next) => {
//   //1.) Get user based on the token
//   //now we will encrypt the randomToken to match with to the encrypted resetToken present in database
//   const hashedToken = crypto
//     .createHash('sha256')
//     .update(req.params.token)
//     .digest('hex');

//   const user = await User.findOne({
//     passwordResetToken: hashedToken,
//     passwordResetExpires: { $gt: Date.now() }
//   });

//   //2.) If token has NOT EXPIRED, and there is user exist, THEN ONLY SET NEW PASSWORD
//   if (!user) {
//     return next(new AppError('Token is invalid or has expired', 400));
//   }

//   user.password = req.body.password;
//   user.passwordConfirm = req.body.passwordConfirm;
//   user.passwordResetToken = undefined;
//   user.passwordResetExpires = undefined;
//   await user.save();

//   //3.) Update changedPasswordAt property for the current user
//   //This is done by pre middleware in user model

//   //4.) Log the user In, send JWT
//   const token = signToken(user._id);

//   res.cookie('jwt', token, {
//     //by this we will make it so, that browser or the client in general will delete the cookie after it has expired
//     expires: new Date(
//       Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
//     ),
//     //secure: true /*Cookie will only be send to an encrypted Connection means https connection*/,
//     httpOnly: true /*by this we make sure that our cookie cannot be modified or accessed by the browser*/
//   });
//   res.status(200).json({
//     status: 'Success',
//     token
//   });
// };

//By Below controller we allow LoggedIn user to Update his password 
exports.updatePassword = async (req, res, next) => {

  //This password updating functionality is only for logged in user, but still we need to pass in his current password, So in order to confirm that the user actually is who he claims to be(Just for Security measure)

  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if Posted curent password is correct
  const previousPassword = req.body.prevPassword;
  if (!user || !(await user.correctPassword(previousPassword, user.password))) {
    return next(
      new AppError('Your current Password is wrong', 401 /*Unauthorized*/)
    );
  }
  if (req.body.newPassword !== req.body.newPasswordConfirm) {
    return next(new AppError('Updated ConfirmPassword should be same', 404));
  }

  // 3) If so, Update password
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.newPasswordConfirm;
  await user.save();

  // 4) Log user In, send JWT(with thw new password that was updated)
  const token = signToken(user._id);

  res.cookie('jwt', token, {
    //by this we will make it so, that browser or the client in general will delete the cookie after it has expired
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    //secure: true /*Cookie will only be send to an encrypted Connection means https connection*/,
    httpOnly: true /*by this we make sure that our cookie cannot be modified or accessed by the browser*/
  });

  res.status(200).json({
    status: 'Success',
    token
  });
};



exports.vella = async (req, res, next) => {
  res.status(200).json({
    status: 'Success',
  });
}