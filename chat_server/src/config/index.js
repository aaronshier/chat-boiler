export const server = production ? `https://ohshutit.app` : `http://localhost:8080`

export const demoObject = require('./DemoObjects')

export const MUIDemoTheme = require('./MUIDemoTheme').default

export const production = true

export const wsURL = production ? `wss://ohshutit.app/ws` : `ws://localhost:8080/ws`

export const socket = 8001

export const status_codes = {
    OK: 200,
    RESOURCE_CREATED: 201,
	BAD_CREDENTIALS: 400,
    RESOURCE_DOESNT_EXIST: 401,
    RESOURCE_ALREADY_EXISTS: 402,
	NOT_FOUND: 404,
	MISSING: 501,
	skt105: 'Sockets authentication didnt find any matching users'
}

export const secret = "xclkjhasdljvhasdkjbaxkjcbaxkcjbadkjfhajbvlkaj"

