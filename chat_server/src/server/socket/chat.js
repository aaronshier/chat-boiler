import { login } from './auth'  
import Chat from '../models/chat'

export const incomingChatService = async ({data, wss, ws}) => {
    
    console.log('this is the message data type', data.type)

    if(data.type === 'global-chat'){
        
        // Authenticate and get most current user data
        let authorized = await login({wss,ws,data}).catch(e => alert(e, 'error from socket auth message "login()"'))
        let user = authorized.user
        
        // Now that we're authenticated we can send messages
        // response code - first make sure theres a user
        if(authorized.status === 200){
            // UPDATE CHAT DATABASE
            let response = data.message
            response.avatar = user.avatar ? user.avatar : false
            response.type = "global-chat"
            console.log({data})
            Chat.create(response)
            wss.clients.forEach( client => client.send(JSON.stringify(response)) )

        } else {
            ws.send( JSON.stringify({
            status: status_codes.RESOURCE_DOESNT_EXIST,
            message: 'error skt105: There seems to be an issue authenticating your login, please log in again to ensure propper functionality'
            }) )
        }
    }
}