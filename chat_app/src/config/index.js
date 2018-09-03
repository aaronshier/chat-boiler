const port = '8000'
export { port }
const ip = '192.168.1.19'
export const wsport = `ws://${ip}:8001`
export const server = `http://${ip}${port && ':'+port}`
export const prefix = 'chat_app'
export const status_codes = {
    OK: 200,
    RESOURCE_CREATED: 201,
    RESOURCE_DOESNT_EXISTS: 210,
    RESOURCE_ALREADY_EXISTS: 211,
    NOT_FOUND: 400,
    MISSING: 501
}