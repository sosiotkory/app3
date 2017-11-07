var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {todo} = require('./models/todo');
var {users} = require('./models/users');

var app = express();

//register middleware to tackle the body request

app.use(bodyParser.json());
// console.log(todo);

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



app.listen(3000, ()=>{
	console.log('App starting at port 3000');
})

module.exports = {app};