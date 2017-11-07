var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect( 'mongodb://<dbuser>:<dbpassword>@ds251245.mlab.com:51245/kory'|| ('mongodb://localhost:27017/toDoApp', { useMongoClient: true }));

module.exports = {mongoose};