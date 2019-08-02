const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Posts = require('../models/posts');
const requireLogin = require("../middleware/requireLogin");



//index route
router.get('/', async (req, res)=>{
	try{
	const users = await User.find({});
	res.render('users/index.ejs', {
		users: users
	})}catch(err){
		console.log(err)
	}
});
//new and create routes
router.get('/new', async (req, res)=>{
	try{
	const user = await User.find(req.body);
	res.render('users/new.ejs', {
		user: user
	})}catch(err){
		res.send(err)
	}
})
router.post('/', async (req, res)=>{
	try{
	const user = await User.create(req.body);
	res.redirect('/users')
	}catch(err){
		res.send(err)
	}
})

//show route
router.get('/:id', async (req, res)=>{
	try{
		const user = await User.findById(req.params.id);
		const userPosts = await Posts.find({user: req.params.id});
		console.log(user, "<-- user");
		console.log(userPosts, "<-- userPost");
		res.render('users/show.ejs', {
			posts: userPosts,
			user: user
		})
	}catch(err){
		res.send(err)
	}
});

//edit and update routes
router.get('/:id/edit', async(req, res)=>{
    try{
    const user = await User.findById(req.params.id);
    res.render('users/edit.ejs', {
        user: user
    })
    }catch(err){
        res.send(err)
    }
})
router.put('/:id', async (req, res)=>{
    console.log(req.body, '<-- req.body in update')
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/users/' + req.params.id);
    })

//delete route
router.delete('/:id', async (req, res)=>{
	try{
	const user = await User.findByIdAndDelete(req.params.id);
	res.redirect('/users')
	}catch(err){
		res.send(err)
	}
})









module.exports = router;
