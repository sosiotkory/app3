var express = require('express');
var bodyParser = require('body-parser');
const _ =require('lodash');

var {mongoose} = require('./db/mongoose');
var {todo} = require('./models/todo');
var {users} = require('./models/users');
var {ObjectID} = require('mongodb');
var {auth} = require('./../middleware/authenticate');

var app = express();
var port = process.env.PORT||3000;

//register middleware to tackle the body request

app.use(bodyParser.json());

app.use('/use', (req,res,next)=>{
	console.log("I think i tried");

	next();
})





app.post('/users/signup', (req,res)=>{
	var body = _.pick(req.body, ['email', 'password']);

	var user = new users(body);
	user.save().then(()=>{
		return user.generateAuthToken();
	}).then((token)=>{
		res.header('x-auth', token).send(user);
	}).catch((e)=>{
		res.status(400).send();
	})


})


app.get('/users/me', auth, (req,res)=>{

	res.send(req.user);

})



app.post('/users/login', (req, res)=>{

	var body = _.pick(req.body, ['email', 'password']);

	users.findByCredentials(body.email,body.password).then((user)=>{
		res.send(user);


	}).catch((e)=>{
		res.status(400).send();
	})
})


app.listen(port, ()=>{
	console.log(`App starting at port ${port}`);
})

module.exports = {app};



//create routes
// app.post('/kory', (req, res)=>{



// var newTodo = new todo({
// 	name : req.body.name,
// 	age : req.body.age
// })
// newTodo.save().then((docs)=>{
// 	res.send(docs)
// }, (err)=>{
// 	res.status(400).send(err)
// });
// })


// app.get('/kory/:id', (req, res)=>{
// 	var id = req.params.id;

// 	if(!ObjectID.isValid(id)){
// 		return res.send(404).send();
// 	}
// 	todo.findById(id).then((docs)=>{
// 		if(!todo){
// 			return res.status(404).send();
// 		}

// 		res.send({docs});
// 	}).catch((e)=>{
// 		res.status(400).send();
// 	})
// })
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
// app.get('/kory', (req, res)=>{
// 	todo.find().then((todos)=>{
// 		res.send({todos});
// 	},(err)=>{
// 	res.send(err);;
// 	})
// })

// app.delete('/kory/:id', (req, res)=>{
// var id = req.params.id;
// if(!ObjectID.isValid(id)){
// 	return res.status(404).send();
// }

// todo.findByIdAndRemove(id).then((docs)=>{
// 	if(!todo){
// 		return res.status(404).send();
// 	}
// 	res.send({docs});
// }).catch((e)=>{
// 	res.status(400).send();
// })
// })

// app.patch('/kory/:id', (req,res)=>{
// 	var id = req.params.id;
// 	var body = _.pick['name','age'];

// 	if(!ObjectID.isValid(id)){
// 	return res.status(404).send();
// }
// todo.findByIdAndUpdate(id, {$inc : {age: -7}}, {new : true}).then((docs)=>{

// 	if(!todo){
// 		return res.status(404).send();
// 	}
// 	res.send({docs});
// }).catch((e)=>{
// 	res.status(400).send();
// })
// })


