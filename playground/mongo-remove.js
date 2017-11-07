var {mongoose}= require('./../server/db/mongoose');
var {users} = require('./../server/models/users');
var {todo} = require('./../server/models/todo');
var {ObjectID} = require('mongodb');


// id = '59f846eb9151693d74d46575';
// if(!ObjectID.isValid(id)){
// 	console.log('Id is not valid');
// }

// users.findById(id).then((docs)=>{
// 	if (!users){
// 		return console.log('User cannot be found');
// 	}
// 	console.log(docs);
// })
// .catch((e)=>console.log(e));

id = '5a010e3c87f62c3ffc4f8fc9';

if(!ObjectID.isValid(id)){
	console.log("Id not found");
}

todo.findByIdAndRemove(id).then((docs)=>{
	if(!todo){
		return console.log('User cannot be found');
	}

	console.log(JSON.stringify(docs, undefined, 2));
}). 
catch((e)=>{
	console.log(e);
})