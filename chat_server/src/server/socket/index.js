import { server, secret, status_codes, facebookAuth, socket } from '../../config'
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: socket });
const User = require('../models/user')
import passport from 'passport'
require('../../config/passport')(passport)
passport.authenticate('jwt', { session: false})
var jwt = require('jsonwebtoken')

console.log(`\n---> running wss on ${socket}  <---\n`)
 
wss.on('connection', function connection(ws) {


  wss.clients.forEach((c, i)=> {
    if(c == ws){
      console.log('I found it!', i)
    }
  })

  ws.on('message', async function incoming(data) {
    let response
    data = JSON.parse(data)
    console.log('user logged in', (wss.clients.length+1))
    if(data.auth.platform === 'facebook'){
      let user = await User.findOne({'facebook.access_token': data.auth.accessToken})
      if(user){
        user = user.toJSON()
        delete user.password; delete user.__v; delete user.iat; delete user.facebook.id;
        delete user.facebook.access_token; delete user.facebook.refresh_token; delete user.facebook.email
      }
      response = {
        status: status_codes.LOGGED_IN, user: user, data: data.message
      }
    }

    if(data.auth.platform === 'local'){
      // run local verify code here
      token = data.auth.token
      
      let user = await jwt.verify(token, secret)

      if(user){
        delete user.password
        delete user.__v
        delete user.iat
      }
      
      response = {
        status: status_codes.LOGGED_IN,
        user: user,
        data: data.message
      }
    }
    console.log('sending message to clients !', response)
    wss.clients.forEach(client => {
      // if (client != ws) {
        client.send(JSON.stringify(response));
      // }
    })

  });


});