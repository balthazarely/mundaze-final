function requireLogin(req,res,next){
	if(!req.session.userId){
		req.session.message = "Login required before continuing.";
		res.redirect("/login");
	} else {
		next()
	}
};

module.exports = requireLogin;