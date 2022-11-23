const path = require('path'); //path is built-in core module, used to manipulate path-names
const express = require('express');
const morgan = require('morgan');
//In order to get access to the cookies, that are in our request, we need to install a middleware
const cookieParser = require('cookie-parser');
const cors = require('cors');




const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
// const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const postsRouter = require('./routes/postRoutes');
// const reviewRouter = require('./routes/reviewRoutes');

const app = express();//express() is a top level function exported by express module

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

app.use(cors(corsOptions));

// 1) GLOBAL MIDDLEWARES
//Serving Static Files
//app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public'))); //all the static assets are served by this route

//Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


// Body parser, reading data from body into req.body
// by this, We can actually limit the amount of data that comes in the body
app.use(
  express.json({
    limit: '10kb' /*body larger then 10KiloByte will not be accepted*/
  })
);
app.use(
  express.urlencoded({
    //this middleware for getting the html form submittion values form request body, which was sent in urlEncoded form
    extended: true,
    limit: '10kb'
  })
);

app.use(cookieParser()); //this middleware parses the data from cookie


app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  console.log(req.body);
  next();
});

console.log('hii hoja');

//---> http://localhost:3000/api/v1/signup
// 3) ROUTES
app.use(
  '/api/v1/',
  userRouter /*this will now act as middleware function, and will be called whenever there is a request to this route */
);

app.use(
  '/api/v1/users',
  postsRouter /*this will now act as middleware function, and will be called whenever there is a request to this route */
);

// app.use('/api/v1/users', userRouter);
// app.use('/api/v1/reviews', reviewRouter);
// app.use('/api/v1/bookings', bookingRouter);

// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

app.use(globalErrorHandler);

module.exports = app;
