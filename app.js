
/**
 * Module dependencies.
 */

var express = require('express')
  , mongoose = require('mongoose')
  , routes = require('./routes')
  , user = require('./routes/user')
  , trade = require('./routes/trade')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/trade/record',trade.record);

mongoose.connect('mongodb://localhost/tradeapp');

process.on('SIGINT', function() {
	  mongoose.connection.close(function () {
	    console.log('Mongoose disconnected on app termination');
	    process.exit(0);
	  });
	});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


