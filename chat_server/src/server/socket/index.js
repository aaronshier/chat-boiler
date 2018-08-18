import { server, socket } from '../../config'

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: socket });

console.log(`\n---> running wss on ${socket}  <---\n`)
 
wss.on('connection', function connection(ws) {
  
  console.log('user connected -> ', ws._client)

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');

});


// // server
// require('net').createServer(function (socket) {
//   console.log("connected");

//   socket.on('data', function (data) {
//       console.log(data.toString());
//   });
// }).listen(socket);

// // client
// var s = require('net').Socket();
// s.connect(socket);
// s.write('Hello');
// s.end();