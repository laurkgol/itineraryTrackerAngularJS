var express = require('express'),
var app = express();
  // IndexCtrl = require("./server/")
  app.get('/', function(req, res){
    // res.sendfile(__dirname +'/client/views/index.html');
    res.render(__dirname +'/client/views/index.html')
  });

  app.use('/js', express.static(__dirname + '/client/js'));
  app.post('/api/trips', function(req, res){
    console.log(req.body)
  });

  app.listen(3000, function(){
    console.log("I'm Listening...")
  });
