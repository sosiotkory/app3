var mongoose = require('mongoose');

var users = mongoose.model('Users', {

	email : {
		type: String
	}
})

module.exports= {users};