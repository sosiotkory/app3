var mongoose = require('mongoose');
var validator = require('validator');
const jwt = require('jsonwebtoken');
const _ =require('lodash');

var userSchema = mongoose.Schema({
email : {
		type: String,
		required : true,
		trim : true,
		unique : true,
		minlength : 1,
			validate : {
			validator : validator.isEmail,
			message : '{VALUE} is not a valid email'
		}

	},

	password : {

		type : String,
		required : true,
		minlength : 6
	},

	tokens : [{
		access : {
			type : String,
		required : true
	},
		token : {
			type : String,
		required : true
		}
	}]

})


// userSchema.methods.toJSON = function(){
// 	var user = this;
// 	var userObject = user.toObject();
// 	return _.pick(userObject, ['email', '_id']);	
// }

userSchema.methods.toJSON = function(){

	var user = this;
	var userObject = user.toObject();

	return _.pick(userObject, ['email', 'password']);
}

userSchema.methods.generateAuthToken = function(){

	var user = this;
	var access = 'auth';
	var token = jwt.sign({_id:user._id.toHexString(),access},'123456').toString();

	user.tokens.push({access, token});

	return user.save().then(()=>{
		return token;
	})
}

userSchema.statics.findByToken= function(token){

	var users = this;
	var decoded;

	try{

		decoded = jwt.verify(token, '123456');

	}catch(err){
		return new Promise((resolve, reject)=>{

			reject();
		})

	}


	return users.findOne({
		'_id' : decoded._id,
		'tokens.token' : token,
		'tokens.access' : 'auth'
	})
}

var users = mongoose.model('Users', userSchema);

module.exports= {users};