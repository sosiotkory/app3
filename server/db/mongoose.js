var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect( 'mongodb://<sosiottest>:<singore1991>@ds249005.mlab.com:49005/sosiottest'|| ('mongodb://localhost:27017/toDoApp', { useMongoClient: true });

module.exports = {mongoose};