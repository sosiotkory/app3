const {SHA256} = require ('crypto-js');


var data = {

	id: 4
}

// data.id=5;
// console.log(data);

// var hash = SHA256(JSON.stringify(data)).toString();
// console.log(hash);

var token = {

	data,

	hash : SHA256(JSON.stringify(data) + 'somesecret').toString()
}

// token.data.id=4;
// token.hash = SHA256(JSON.stringify(token.data)).toString();


var resultHash = SHA256(JSON.stringify(token.data)+ 'somesecret').toString();

if (resultHash===token.hash){
	console.log('Result was not manipulated', resultHash);
}else{
	console.log('It was manipulated');
}