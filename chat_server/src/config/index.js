export const server = `http://localhost:8000`
export const demoObject = require('./DemoObjects')
export const MUIDemoTheme = require('./MUIDemoTheme').default
export const production = false
export const database = 'chat_app'
export const status_codes = {
    OK: 200,
    RESOURCE_CREATED: 201,
    RESOURCE_DOESNT_EXISTS: 210,
    RESOURCE_ALREADY_EXISTS: 211,
    NOT_FOUND: 400,
    MISSING: 501
}