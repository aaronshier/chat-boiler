import { server, secret, status_codes, facebookAuth, socket } from '../../config'
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: socket });
const User = require('../models/user')
import passport from 'passport'
require('../../config/passport')(passport)
passport.authenticate('jwt', { session: false})
var jwt = require('jsonwebtoken')
import { login } from './auth'  
 
wss.on('connection', function connection(ws) {
  ws.on('message', async function incoming(data) {
    // Parse Message Data
    data = JSON.parse(data)
    console.log('data coming!')
    console.log({data})
    // Login logic for initial logins and reconnecting
    if(data.type === 'initial-login'){ 
      let authorized =  await login({wss,ws,data}).catch(e => console.log(e, 'error from socket auth message "login()"'))
      authorized.type = 'initial-login'
      ws.send(JSON.stringify(authorized))
    }
    if(data.type === 'chat'){
      // Authenticate and get most current user data
      let authorized = await login({wss,ws,data}).catch(e => console.log(e, 'error from socket auth message "login()"'))
      let user = authorized.user
      console.log({user})
      // Now that we're authenticated we can send messages
      // response code - first make sure theres a user
      if(authorized.status === 200){
        let response = data.message
        console.log({MESSAGE: data.message})
        response.avatar = user.avatar ? user.avatar : false
        response.type = "chat"
        wss.clients.forEach( client => client.send(JSON.stringify(response)) )
      } else {
        ws.send( JSON.stringify({
          status: status_codes.RESOURCE_DOESNT_EXISTS,
          message: 'error skt105: There seems to be an issue authenticating your login, please log in again to ensure propper functionality'
        }) )
      }
    }
  })
})

