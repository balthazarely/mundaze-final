const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const userSchema = Schema({
	profileImg: String,
	aboutMe: String,
	username: {type: String, unique: true, require: true},
	password: {type: String, require: true},
	posts: {
		type: Schema.Types.ObjectId,
		ref: "Posts"
	}
})



const User = mongoose.model('User', userSchema);
module.exports = User;










