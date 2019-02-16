import { production } from './index'

export const server = production ? `https://ohshutit.app` : `http://localhost:8080`

import { secret as jwtSecret } from './index'

export const secret = jwtSecret

export const googleAuth = {
  clientID: 'YOUR_CLIENT_KEY',
  clientSecret: 'YOUR_SECRET_KEY',
  callbackURL: `${server}/auth/google/callback`,
}

export const facebookAuth = {
  clientID: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_SECRET_KEY',
  callbackURL: `${server}/auth/facebook/callback`,
}

const database_name = 'chat_app'

export { database_name }

export const database = {
		url: `mongodb://localhost/${database_name}`
}
