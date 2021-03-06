// const port = '8000'
// export { port }
export const wsport = production ? `wss://ohshutit.app/ws` : `ws://192.168.1.30:8000/ws`
export const server = production ? 'https://ohshutit.app' : 'http://192.168.1.30:8000'
export const prefix = 'chat_app'

export const production = false

export const status_codes = {
    OK: 200,
    RESOURCE_CREATED: 201,
    RESOURCE_DOESNT_EXIST: 210,
    RESOURCE_ALREADY_EXISTS: 211,
    NOT_FOUND: 400,
    MISSING: 501
}

export const theme = {
    primary: '#0af',
    primary_light: '4bf',
    primary_dark: '#0af',
    secondary: '#0af',
    secondary_light: '4bf',
    secondary_dark: '#0af',
}