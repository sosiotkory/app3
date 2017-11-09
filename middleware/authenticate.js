
var {users} = require('./../server/models/users');

var auth = (req, res, next)=>{
	var token = req.header('x-auth');

	users.findByToken(token).then((user)=>{

		if(!user){
			return Promise.reject();
		}
		req.user = user;
		req.token = token;
		next(); 
	}).catch((e)=>{
			return res.status(401).send();

	})

}

module.exports = {auth};