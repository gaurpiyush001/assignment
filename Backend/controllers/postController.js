const Post = require("../models/postModel");

exports.post = async (req, res) => {
    console.log('posting new post');

    const newPost = await Post.create({
        userName: req.body.name,
        userEmail: req.body.email,
        description: req.body.postText,
        // passwordChangedAt: req.body.passwordChangedAt
        //   ? req.body.passwordChangedAt
        //   : undefined,
    });

    //sending response to user
    res.status(201).json({
        status: 'success',
        data: {
            post: newPost
        }
    });



};