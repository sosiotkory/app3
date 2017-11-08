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

// userSchema.methods.generateAuthToken = function(){

// 	var user = this;
// 	var access = "auth";
// 	var token = jwt.sign({_id:user._id.toHexString(),access},'qwerty').toString();

// 	user.tokens.push({access, token});

// 	return user.save().then(()=>{
// 		return token;
// 	})
// }

var users = mongoose.model('Users', userSchema);

module.exports= {users};