const express = require('express');
const router = express.Router();
const Posts = require('../models/posts');
const User = require('../models/user');
const requireLogin = require("../middleware/requireLogin");


//INDEX
router.get('/', async (req, res) => {
    try {
        const findPosts = await Posts.find();
        res.render('posts/index.ejs', {
            posts: findPosts,
        });
    }catch (error) {
        res.send(error);
    }
})


//NEW
router.get('/new', async (req, res) => {
    try{
        const foundUserId = req.session.userId
        console.log(foundUserId)
        console.log("this is the new page for the post")
        res.render('posts/new.ejs', {
            userId: foundUserId
        })
    }catch (error) {
        res.send(error);
    }
})

//SHOW
router.get('/:id', async (req, res) => {
    try{
        const foundShowPost = await Posts.findById(req.params.id).populate("user");
        const user = await User.findById(req.params.id);  
        const foundPostBody = await Posts.findById(req.params.id);
        const currentUser = req.session.userId;
        console.log(foundShowPost);
        res.render('posts/show.ejs', {
            posts: foundShowPost,
            user: user,
            currentUser: currentUser
        });
    }catch (error){
        res.send(error);
        console.log(error);
    }
});

//DELETE
router.delete('/:id', async (req, res) => {
    const foundPost = await Posts.findById(req.params.id);
    const foundUser = await User.findById(foundPost.user);
    if(foundUser._id == req.session.userId){
        await Posts.findByIdAndDelete(req.params.id);
        res.redirect('/posts');
    }else{
        res.send('Sorry, this is not your post to delete.');
    }
    });



//EDIT
router.get('/:id/edit', async (req, res) => {
    const foundPost = await Posts.findById(req.params.id);
    const foundUser = await User.findById(foundPost.user); 
    if(foundUser._id == req.session.userId){
            res.render('posts/edit.ejs', {
            posts: foundPost
     })} else{
                res.send('Sorry, this is not your post to edit.');
            }
 });

 //UPDATE 
 router.put('/:id', async(req, res) => {
     try{
         const updatedPost = await Posts.findByIdAndUpdate(req.params.id, req.body);
         res.redirect('/posts');
     } catch(error){
         res.send(err)
     }
 });

//CREATE
router.post('/', async (req, res) => {
    try{
        
        if (req.body.photo == '') {
             req.body.photo = undefined
        }
        
        const createdPost = await Posts.create(req.body);
        console.log(req.body)
        res.redirect('/posts');
    }catch(error) {
        res.send(error)
    }
});

module.exports = router;