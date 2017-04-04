var express = require('express');
var app = express();
var http = require('http');
var busboy = require('busboy-body-parser');
var server = http.Server(app);
var mysql = require('mysql');
var multer = require('multer');
//var fs = require('fs');
var uploads = multer({
	dest: 'public/images/uploaded_file'
});

var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 


var routes = require('./routes');	

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Sanchali@376',
	database:'comweb'
});
	
connection.connect();
app.use(express.static('public')); 

var port = process.env.PORT || 8000; 

app.get('/', function (req, res){       
  res.sendfile('index.html');
});


routes.init(app,connection); 

 app.post('/upload',uploads.any(), function (req, res) {
	console.log(req.body.unstable);
	res.send('uploaded');
 });


server.listen(port, function(){
  console.log('listening on :' + port);
});
