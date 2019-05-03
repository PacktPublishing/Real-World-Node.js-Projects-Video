const express = require('express'),
	app 	  = express(),
	http 	  = require('http').Server(app),
	io 		  = require('socket.io')(http);


app.get('/', function(req, res){
  res.sendFile(__dirname + "/signin.html");
});

app.get('/:user', function(req, res){
	res.sendFile(__dirname + "/index.html");
});



io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });


  socket.on('chat message', function(msg){
    console.log(msg);
    io.emit('chat message', msg);
  });

});


http.listen(3000, function(){
  console.log('listening on *:3000');
});