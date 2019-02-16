import { production } from './index'

export const server = production ? `https://ohshutit.app` : `http://localhost:8080`

import { secret as jwtSecret } from './index'

export const secret = jwtSecret

export const googleAuth = {
  clientID: '443541868618-98u41tbu7r8h2j25d8m87em6au3af9tp.apps.googleusercontent.com',
  clientSecret: 'zfgooO9bgy9l9_k0tYZPaP3N',
  callbackURL: `${server}/auth/google/callback`,
}

export const facebookAuth = {
  clientID: '1347027622099102',
  clientSecret: 'b35d42a92dbd925b4edbe7d5b4648fcb',
  callbackURL: `${server}/auth/facebook/callback`,
}

const database_name = 'chat_app'

export { database_name }

export const database = {
		url: `mongodb://localhost/${database_name}`
}
