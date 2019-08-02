const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require("express-session");
const app = express();


require('./db/db');


const loginController = require('./controllers/login');
const usersController = require('./controllers/users');
const postsController = require('./controllers/posts');

app.use(session({
	secret: "THIS IS A RANDOM SECRET STRING",
	resave: false, // only save the cookie when we add
	// something or delete something from it
	// MUTATE IT
	saveUninitialized: false // don't save the cookie
	// until the user has "logged in", legal reasons
	// as well, you're not supposed to track user data
	// until the user has logged in to an app
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));


app.use((req, res, next) => {
	res.locals.currentUser = req.session.userId
	if(req.session.message){
		res.locals.message = req.session.message
		req.session.message = null;
	}
	next();
});

app.use(express.static('public'));


app.use('/login', loginController);

app.use('/users', usersController);

app.use('/posts', postsController);


app.get("/", (req,res) => {
	res.render("index.ejs");
})



app.listen(3000, () => {
    console.log("the server is listening for requests...")
});
