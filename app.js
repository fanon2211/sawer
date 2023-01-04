const express = require('express');
const app = express();
const http = require('http');
var https = require('https');
var fs = require( 'fs' );

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://streamelements.com/overlay/63b3d6bd6a768369caae9643/o9ytKLB5kjfjyLFfCaUTQ0n9Ku61qGzNomCbeyPeHWht6zrM');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next();
});

const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: false
  }
});



app.post('/', function(request, response){
  console.log(request.body)
  console.log(response.body)
  response.send('ok')
})

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
})


io.on('connection', (socket) => {
  console.log('a user connected normal namespace');
});


server.listen(3000, () => {
  console.log(' - listening on *:3000');
});
