var express = require('express'),
	routes = require('./routes'),
	user = require('./routes/user'),
	http = require('http'),
	path = require('path'),
	mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

var url = 'mongodb://localhost:27017/employee_directory';

MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

    db.close();
  }
});
	
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res){
  res.render('login', {
    title: 'Login'
  });
});

app.get('/home', function(req, res){
  res.render('home', {
    title: 'Home'
  });
});

app.get('/addemployee', function(req, res){
  res.render('addemployee', {
    title: 'Add Employee'
  });
});

app.get('/employeesearch', function(req, res){
  res.render('employeesearch', {
    title: 'Employee Search'
  });
});

app.get('/employeeview', function(req, res){
  res.render('employeeview', {
    title: 'Employee View'
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

