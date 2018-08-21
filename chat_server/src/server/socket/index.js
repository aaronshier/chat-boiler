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

  let user = null

  ws.on('message', async function incoming(data) {
    let response
    data = JSON.parse(data)
    console.log({data})
    // Validate Facebook Auth Token and get user data
    if(data.auth.platform === 'facebook'){

      console.log("access token: ", data.auth.accessToken)

      user = await User.findOne({'facebook.access_token': data.auth.accessToken})

      console.log(user)

      if(user){
        user = user.toJSON()
        ws.id = user._id
        delete user.password; delete user.__v; delete user.iat; delete user.facebook.id;
        delete user.facebook.access_token; delete user.facebook.refresh_token; delete user.facebook.email
      } else if(data.auth.accessToken){
        
        console.log('hmmmmm, looks like your facebook token and your database token are different, lets run the update logic ')

      }

      response = {
        user: user
      }
      console.log({response})
    }

    // Validate Local Auth Token and get user data
    if(data.auth.platform === 'local'){
      // run local verify code here
      token = data.auth.token
      
      user = await jwt.verify(token, secret)
      //TODO: check these deletes make sure they work
      if(user){
        delete user.password
        delete user.__v
        delete user.iat
      }
    }

    // Now that we're authenticated we can send messages
    console.log("sending login", user)
    if(user._id && data.type === 'login'){
      response.user = user
      response.type = login
      ws.send(JSON.stringify(response))
    }

    if(response.user && data.type === 'chat'){
      
      response.data = data.message,
      response.type = 'chat'

      wss.clients.forEach(client => {
          client.send(JSON.stringify(response))
      })

    }

  })

})