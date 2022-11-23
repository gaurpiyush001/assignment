const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({

    description: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    media: [String],
    userEmail: {
        type: String,
        required: [true, 'This should be given']
    },
    userProfileImage:{
        type: String
    },
    userName: {
        type: String,
        required: [true, 'This should be given']
    },
    like: {
        type: Number,
        default: 0
    }

});

//Query Middleware ---------------
//Populating the post dataset with
// postSchema.pre(/^find/, function(next) {
  
//     this.populate({
//       path: 'user',
//       select: 'name photo userId emailId'
//     });
  
//     next();
// });

const Post = mongoose.model('Post', postSchema); //RPost model should be created after all the middlewares and proper schema is defined

module.exports = Post;