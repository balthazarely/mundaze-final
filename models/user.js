const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const userSchema = Schema({
	profileImg: {type: String, default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpzD-cx0s1md7QU92v0ZDJWCiIKfQ8HWxIiI76o5APPy11ilZ6bA'},
	aboutMe: {type: String, default:"im a boring peice of shit"},
	username: {type: String, unique: true, require: true},
	password: {type: String, require: true},
	posts: {
		type: Schema.Types.ObjectId,
		ref: "Posts"
	}
})



const User = mongoose.model('User', userSchema);
module.exports = User;










