const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// ------------FAT MODELS , THIN CONTROLLERS --------------//

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
    email: {
        type: String,
        required: [true, 'Please tell us your email!'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    userId: {
        type: String
    },
    profilePhoto: {
        type: String,
        default: 'default.jpg'
    },
    coverPhoto: {
        type: String,
        default: 'default.jpg'
    },
    password: {
        type: String,
        required: [true, 'Please provide Password'],
        minlength: 8,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please Confirm your Password'],
        validate: {
            // only work on saving or creating the document
            // below validation will not work on updating a document
            validator: function (el) {
                return el === this.password; // Equating the Password to check
            },
            message: 'Passwords are not the same' // error message
        }
    },
    passwordChangedAt: Date,
    //We need to encrypt this field bcz if hacker gets access to database then he can to change users password,
    //   passwordResetToken: String
    //   passwordResetExpires: Date,
    // posts: [
    //     //Later we will populate this,Only in the query not in the actual data
    //     {
    //         //we can populate this with populate process at the query time as if the documents are embedded
    //         type:
    //             mongoose.Schema
    //                 .ObjectId /*means we expect the type of each element in the guides array as MONGODB ID*/,
    //         ref: 'Post' //references between Posts and Users
    //     }
    // ],
    followers: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ],
    following: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ],
    active: {
        type: Boolean,
        default: true,
        select: false
    },

},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// userSchema.virtual('userId').get(function() {
//     return this.email.substring(0, this.email.indexOf('@'));
//   });

/////////////////--------------VIRTUAL POPULATE----------------------------/////////////
userSchema.virtual('posts', {
    ref: 'Post',
    //Now we need to specify the name of the fields in order to connect the two datasets/Collections
    foreignField: 'userId',
    localField: 'userId'
});

userSchema.pre(/^find/, function(next) {
    this.populate({
      path:
        'following' /*attribute which we want to populate from the referenced collection*/,
      select: 'post'
    });
  
    next();
  });



// Encrypting passwrd, pre save hook()
userSchema.pre('save', async function (next) {

    //checking if doc is modified or not
    if (!this.isModified('password')) return next();

    // Hashing/Encrypting the password,
    this.password = await bcrypt.hash(
        this.password,
        10
    );

    this.passwordConfirm = undefined; //we don't want to persist confirm password to database

    next();
});


userSchema.pre('save', function (next) {

    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

///////////---------------------------INSTANCE METHOD, for decrypting the password for verificaation at time of logginIn------------------/////////////////
userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    //function will decrypt the password saved in database and then compare it
    return await bcrypt.compare(candidatePassword, userPassword);
};

//checking if logged in user changed his password
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );
        // console.log(this.passwordChangedAt.get)
        // console.log(
        //   this.passwordChangedAt,
        //   JWTTimestamp,
        //   'checking password changed timing'
        // );
        return JWTTimestamp < changedTimestamp; // 100 < 200
    }

    // Falsemeans NOT changed
    // console.log('passwordChangedAt property not exist');
    return false;
};

userSchema.methods.createPasswordResetToken = function () {
    //passwordResetToken should be a random string, but it does'nt need to be cryptographically strong as
    //the password hash, so we can use RANDOM BYTES FUNCTION , from built-in CRYPTO MODULE

    const resetToken = crypto.randomBytes(32).toString('hex');
    //resetToken will be send to the user, so its like a reset Password, which the user can use to create a new REAL PASSWORD, and ofcourse ONLY THE USER WILL HAVE ACCESS TO THIS TOKEN

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // this.passwordResetToken = resetToken;

    console.log({ resetToken }, this.passwordResetToken);

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken; //plain text token that we gonna send through Email
};

const User = mongoose.model('User', userSchema); //creating model out of schema

module.exports = User;
