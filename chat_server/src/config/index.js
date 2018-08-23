export const server = `http://localhost:8000`

export const demoObject = require('./DemoObjects')

export const MUIDemoTheme = require('./MUIDemoTheme').default

export const production = false

export const socket = 8001

export const status_codes = {
    OK: 200,
    RESOURCE_CREATED: 201,
	BAD_CREDENTIALS: 400,
    RESOURCE_DOESNT_EXISTS: 401,
    RESOURCE_ALREADY_EXISTS: 402,
	NOT_FOUND: 404,
	MISSING: 501,
	skt105: 'Sockets authentication didnt find any matching users'
}

const database_name = 'chat_app'

export { database_name }

export const database = {
		url: `mongodb://localhost/${database_name}`
}

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
export const secret = "xclkjhasdljvhasdkjbaxkjcbaxkcjbadkjfhajbvlkaj"

