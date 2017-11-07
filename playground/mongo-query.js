var {mongoose}= require('./../server/db/mongoose');
var {users} = require('./../server/models/users');
var {ObjectID} = require('mongodb');


id = '59f846eb9151693d74d46575';
if(!ObjectID.isValid(id)){
	console.log('Id is not valid');
}

users.findById(id).then((docs)=>{
	if (!users){
		return console.log('User cannot be found');
	}
	console.log(docs);
})
.catch((e)=>console.log(e));