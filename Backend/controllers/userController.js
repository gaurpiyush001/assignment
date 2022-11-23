
const User = require('./../models/userModel');


exports.getAllUsers = async (req, res, next) => {
    const users = await User.find();
  
    console.log('getAll user');
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users
      }
    });
  };