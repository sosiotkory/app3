const {SHA256} = require ('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


var password = 'cherukory';

bcrypt.genSalt(10,(err,salt)=>{
	bcrypt.hash(password, salt, (err, hash)=>{
	console.log(hash);
	});
});

var hashed = '$2a$10$tp8uTGvFQA/k0GYGxj0b5u0CjawYp0tt13CRq.dlWhqxQlNQceuAe';

bcrypt.compare(hashed,password,(err,re)=>{
	console.log(re);
})



// var data = {

// 	id: 345
// }


// var token = jwt.sign(data, 'kory123');
// console.log(token);
// var decoded = jwt.verify(token, 'kory123');
// console.log( 'This is the decoded vale:',decoded);
// data.id=5;
// console.log(data);

// var hash = SHA256(JSON.stringify(data)).toString();
// console.log(hash);

// var token = {

// 	data,

// 	hash : SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// // token.data.id=4;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();


// var resultHash = SHA256(JSON.stringify(token.data)+ 'somesecret').toString();

// if (resultHash===token.hash){
// 	console.log('Result was not manipulated', resultHash);
// }else{
// 	console.log('It was manipulated');
// }