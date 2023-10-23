// create web server with node.js

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// set view engine
app.set('view engine', 'jade');

// set static directory
app.use(express.static('public'));

// set body parser
app.use(bodyParser.urlencoded({extended: false}));

// set router
app.get('/', function(req, res){
	res.render('index');
});

app.get('/form', function(req, res){
	res.render('form');
});

app.post('/form_receiver', function(req, res){
	var title = req.body.title;
	var description = req.body.description;
	res.send(title + ', ' + description);
});

app.get('/topic/:id', function(req, res){
	var topics = [
		'Javascript is...',
		'Nodejs is...',
		'Express is...'
	];
	var output = `
		<a href="/topic/0">Javascript</a><br>
		<a href="/topic/1">Nodejs</a><br>
		<a href="/topic/2">Express</a><br>
		${topics[req.params.id]}
	`
	res.send(output);
});

app.get('/topic/:id/:mode', function(req, res){
	res.send(req.params.id + ', ' + req.params.mode);
});

app.get('/template', function(req, res){
	res.render('temp', {time: Date(), title: 'Jade'});
});

app.get('/dynamic', function(req, res){
	var lis = '';
	for(var i=0; i<5; i++){
		lis = lis + '<li>coding</li>';
	}
	var time = Date();
	var output = `
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8">
			<title></title>
		</head>
		<body>
			Hello, Dynamic!
			<ul>
			${lis}
			</ul>
			${time}
		</body>
		</html>
	`;
	res.send(output);
});

app.listen(3000, function(){
	console.log('Connected, 3000 port!');
});

