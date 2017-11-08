var express = require('express');
var bodyParser = require('body-parser');
const _ =require('lodash');

var {mongoose} = require('./db/mongoose');
var {todo} = require('./models/todo');
var {users} = require('./models/users');
var {ObjectID} = require('mongodb');

var app = express();
var port = process.env.PORT||3000;

//register middleware to tackle the body request

app.use(bodyParser.json());
// console.log(todo);
//user model

app.post('/use', (req,res)=>{
	var body = _.pick(req.body, ['email', 'password']);

	var User = new users(body);
	User.save().then((docs)=>{
		if(!users){
			return res.status(404).send();
		}
		res.send(JSON.stringify(docs, undefined, 2));
	}).catch((e)=>{
		res.status(400).send();
	})


})
//create routes
app.post('/kory', (req, res)=>{



var newTodo = new todo({
	name : req.body.name,
	age : req.body.age
})
newTodo.save().then((docs)=>{
	res.send(docs)
}, (err)=>{
	res.status(400).send(err)
});
})


app.get('/kory/:id', (req, res)=>{
	var id = req.params.id;

	if(!ObjectID.isValid(id)){
		return res.send(404).send();
	}
	todo.findById(id).then((docs)=>{
		if(!todo){
			return res.status(404).send();
		}

		res.send({docs});
	}).catch((e)=>{
		res.status(400).send();
	})
})
// app.get('/kory/:id', (req, res)=>{
// 	var id = req.params.id;

// 	if(!ObjectID.isValid(id)){
// 		return res.status(404).send();
// 	}

// 	todo.findById(id).then((docs)=>{
// 		if(!todo){
// 			return res.status(404).send();
// 		}

// 		res.send(docs);
// 	}).
// 	catch((e)=>{
// 		res.status(400).send()
// 	})

// })

//listing resources

// app.get('/kory', (req, res)=>{
// 	users.find().then((user)=>{
// 		res.send({user});
// 	},(err)=>{
// 	res.send(err);;
// 	})
// })
app.get('/kory', (req, res)=>{
	todo.find().then((todos)=>{
		res.send({todos});
	},(err)=>{
	res.send(err);;
	})
})

app.delete('/kory/:id', (req, res)=>{
var id = req.params.id;
if(!ObjectID.isValid(id)){
	return res.status(404).send();
}

todo.findByIdAndRemove(id).then((docs)=>{
	if(!todo){
		return res.status(404).send();
	}
	res.send({docs});
}).catch((e)=>{
	res.status(400).send();
})
})

app.patch('/kory/:id', (req,res)=>{
	var id = req.params.id;
	var body = _.pick['name','age'];

	if(!ObjectID.isValid(id)){
	return res.status(404).send();
}
todo.findByIdAndUpdate(id, {$inc : {age: -7}}, {new : true}).then((docs)=>{

	if(!todo){
		return res.status(404).send();
	}
	res.send({docs});
}).catch((e)=>{
	res.status(400).send();
})
})




app.listen(port, ()=>{
	console.log(`App starting at port ${port}`);
})

module.exports = {app};