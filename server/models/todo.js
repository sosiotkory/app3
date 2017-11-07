var mongoose = require('mongoose');

var todo = mongoose.model('Todo', {

	name : {
		type : String,
		required : true
	}, 
	age : {
		type : Number
	}
});

module.exports= {todo};