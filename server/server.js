var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {todo} = require('./models/todo');
var {users} = require('./models/users');
var {ObjectID} = require('mongodb');

var app = express();
var port = process.env.PORT||3000;

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



app.listen(port, ()=>{
	console.log(`App starting at port ${port}`);
})

module.exports = {app};