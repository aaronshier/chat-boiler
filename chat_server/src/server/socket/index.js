import { server, secret, status_codes, facebookAuth, socket } from '../../config'
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: socket });
const User = require('../models/user')
import passport from 'passport'
require('../../config/passport')(passport)
passport.authenticate('jwt', { session: false})
var jwt = require('jsonwebtoken')
import { login } from './auth'  
import { incomingChatService } from './chat'  

let runningChat = []

setInterval(() => {
  if(runningChat.length > 100){
    runningChat = []
  }
}, 1000 * 60 * 1 /*one minute interval*/)

wss.on('connection', function connection(ws) {
  console.log('connection made!')
  ws.on('message', async function incoming(data) {

    // Parse Message Data
    data = JSON.parse(data)
    

    // Login logic for initial logins and reconnecting
    if(data.type === 'initial-login'){ 
      let authorized =  await login({wss,ws,data}).catch(e => console.log(e, 'error from socket auth message "login()"'))
      authorized.type = 'initial-login'
      authorized.running_chat = runningChat
      ws.send(JSON.stringify(authorized))
    }

    incomingChatService({data, ws, wss})
  })
})

