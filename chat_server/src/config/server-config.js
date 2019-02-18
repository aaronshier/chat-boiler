import { production } from './index'

export const server = production ? `https://yourdomain.com` : `http://localhost:8080`

import { secret as jwtSecret } from './index'

export const secret = jwtSecret

export const googleAuth = {
  clientID: 'XXX',
  clientSecret: 'XXX',
  callbackURL: `${server}/auth/google/callback`,
}

export const facebookAuth = {
  clientID: 'XXX',
  clientSecret: 'XXX',
  callbackURL: `${server}/auth/facebook/callback`,
}

const database_name = 'chat_app'

export { database_name }

export const database = {
		url: `mongodb://localhost/${database_name}`
}
