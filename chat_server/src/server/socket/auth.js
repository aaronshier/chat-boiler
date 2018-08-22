import { server, secret, status_codes, facebookAuth, socket } from '../../config'
import User from '../models/user'

export const login = async ({wss, ws, data}) => {
    let user, response
    // Validate Facebook Auth Token and get user data
    if(data.auth.platform === 'facebook'){

        // See if this token matches a profile already (save an api call)
        user = await User.findOne({'facebook.access_token': data.auth.accessToken})
  
        // If we find a user, setup the response with the user
        if(user){
            user = user.toJSON()
            ws.id = user._id
            delete user.password; delete user.__v; delete user.iat; delete user.facebook.id;
            delete user.facebook.access_token; delete user.facebook.refresh_token; delete user.facebook.email

            response = {
                status: status_codes.OK,
                user,
                token: data.auth.accessToken,
                type: 'login'
            }

        } else if(data.auth.accessToken){
            
            //hmmmmm, looks like your facebook token and your database token are different, 
            console.log('hmmmmm, looks like your facebook token and your database token are different, lets run the update logic ')
            
            //lets run the update logic
            let update = await fetch(`${server}/auth/facebook/token`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${data.auth.accessToken}`
            }
            }).then(response=>response.json())
            .catch(e => console.log('there was an error in loginToServerWithFacebook', e))
            
            response = update
        }

    }

    // Validate Local Auth Token and get user data
    if(data.auth.platform === 'local'){
        // run local verify code here
        let token = data.auth.token
        
        user = await jwt.verify(token, secret)
        //TODO: check these deletes make sure they work
        if(user){
            delete user.password
            delete user.__v
            delete user.iat
        }
        response = {
            status: status_codes.OK,
            user,
            token
        }
    }
    
    ws.send(JSON.stringify(response))
}