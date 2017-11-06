var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('./db/mongoose');
var todo = require('./models/todo');

var app = express();

//register middleware to tackle the body request

app.use(bodyParser.json());

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




app.listen(3000, ()=>{
	console.log('App starting at port 3000');
})