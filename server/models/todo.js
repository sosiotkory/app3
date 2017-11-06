var mongoose = require('mongoose');

var todo = mongoose.model('todo', {

	name : {
		type : String,
		required : true
	}, 
	age : {
		type : Number
	}
});

module.exports= {todo};