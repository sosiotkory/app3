var asyncAdd = (a,b)=>{

	return new Promise((resolve,reject)=>{

		setTimeout(()=>{
			if (typeof a ==='number' && typeof b ==='number'){
				resolve(a + b);
			}else{
				reject('Arguments must be numbers');
			}

		}, 1500)
	})
}
asyncAdd(7,6).then((res)=>{
	console.log('Result :', res);
	return asyncAdd(res, 3)
},(err)=>{
	console.log('Errors: ', err);
}).then((result)=>{
	console.log(result);
}, (err)=>{
	console.log(err);
})

// .catch((e)=>{
// 	console.log('Errors', e);
// })