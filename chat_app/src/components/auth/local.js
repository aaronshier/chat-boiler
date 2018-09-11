import { AsyncStorage } from "react-native"
import { prefix } from '../../config'

import { server, status_codes } from '../../config'

export const checkForLocalToken = async () => {
    try {
        const value = await AsyncStorage.getItem(`@${prefix}:jwt`).catch(e => console.log('there was an error in checkForLocalToken', e))
        if (value !== null) {
            return value
        }
    } catch (error) {
        return error
    }
}

export const eraseLocalToken = async () => {
    try {
        const value = await AsyncStorage.removeItem(`@${prefix}:jwt`, '').catch(e => console.log('there was an error in eraseLocalToken', e))
        if (value === null) {
            return true
        }
    } catch (error) {
        return false
    }
}

export const loginWithLocalToken = async (info) => {
    let user_token = info.token
    let user

    if(user_token){
        login = await fetch(`${server}/api/mobile/auto-login`, {
            include: 'credentials',
            method: 'POST',
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json',
                'Authorization': `JWT ${user_token}`
            },
        }).then(response => response.json())
        .then(async res => {   
            if(res.status === status_codes.OK){
                const value = await AsyncStorage.setItem(`@${prefix}:jwt`, info.token).catch(e => console.log('there was an error in loginWithLocalToken/AsyncStorage.setItem()', e))
                user = res.user
                user.login = true
                return true
            } else {
                login = false
                return false
            }
        }).catch(e => console.log('there was an error in loginWithLocalToken', e))
    }
    
    return user
}