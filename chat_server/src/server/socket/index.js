import { server, secret, status_codes, facebookAuth, socket } from '../../config'
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: socket });
const User = require('../models/user')
import passport from 'passport'
require('../../config/passport')(passport)
passport.authenticate('jwt', { session: false})
var jwt = require('jsonwebtoken')
import { login } from './auth'
console.log(`\n---> running wss on ${socket}  <---\n`)
 
wss.on('connection', function connection(ws) {

  let user = null

  ws.on('message', async function incoming(data) {
    let response
    data = JSON.parse(data)

    
    if(data.type === 'login') await login({wss,ws,data})

    // Now that we're authenticated we can send messages
    // response code - first make sure theres a user
    if(data.type === 'chat'){
        response.user = {
          _id: user._id,
          avatar: null,
          username: null,
        }

      // If its a chat message
      if(data.type === 'chat'){
        
        response.status = status_codes.OK
        response.message = data.message,
        response.type = 'chat'

        wss.clients.forEach(client => {
            client.send(JSON.stringify(response))
        })

      }
      
    } else {
      ws.send(JSON.stringify({status: status_codes.RESOURCE_DOESNT_EXISTS, message: 'error skt105: There seems to be an issue authenticating your login, please log in again to ensure functionality'}))
    }

  })

})