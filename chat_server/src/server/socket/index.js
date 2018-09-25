import passport from 'passport'

require('../../config/passport')(passport)
passport.authenticate('jwt', { session: false})

import { login } from './auth'  
import { incomingChatService } from './chat'  

let runningChat = []

setInterval(() => {
  if(runningChat.length > 100){
    runningChat = []
  }
}, 1000 * 60 * 1 /*one minute interval*/)


export default ({ws, wss, req}) => {
  ws.on('message', async function incoming(data) {
    console.log('connection made!', data)

    // Parse Message Data
    data = JSON.parse(data)

    // Login logic for initial logins and reconnecting
    if(data.type === 'initial-login'){ 
      let authorized =  await login({wss,ws,data}).catch(e => alert(e, 'error from socket auth message "login()"'))
      authorized.type = 'initial-login'
      authorized.running_chat = runningChat
      ws.send(JSON.stringify(authorized))
    }

    incomingChatService({data, ws, wss})
  })
}