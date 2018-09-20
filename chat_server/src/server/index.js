// Import Modules
import express from 'express'
import mongoose from 'mongoose'
import logger from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import flash from 'connect-flash'
import passport from 'passport'
import cookieSession from 'cookie-session'
import helmet from 'helmet'
import favicon from 'serve-favicon'

// Import Routes
import ssr from './routes/ssr.js'
import tests from './routes/tests.js'
import api from './routes/api.js'
import auth from './routes/auth.js'
import mobile from './routes/mobile.js'
import sockets from './socket'

// Create App
const app = express()

const expressWs = require('express-ws')(app);

// Set port
const port = process.env.PORT || 8000

// Configure DB
import { database } from '../config'

mongoose.connect(database.url)

// Add Passport Config To Passport
require('../config/passport')(passport)

// Chat Socket Server
// require('./socket')

// Setup Basic Security
app.use(helmet())

// Dev Logging Tool
app.use(logger('dev'))

// Favicon
app.use(favicon('public/favicon.png'))

// Static Route
app.use(express.static('public'))

// Parsing
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Server Cookies
app.use(cookieParser())
app.use(cookieSession({
  // Session Name
  name: 'CHAT_APP',

  // Encryption Keys
  keys: ['your_keys', 'go_here', 'make_many'  ],

  // Cookie Options
  maxAge: 1 * 60 * 60 * 1000 // Expire login after 1 hour
}));

// Setup Passport
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Routes
app.use('/tests', tests)
app.use('/api', api)
app.use('/api/mobile', mobile)
app.use('/auth', auth)

// Websocket needs to be passed the main socket manager (wss)
// so we give express a function I created in ./socket/index.js
app.ws('/ws', (ws, req) => sockets({ws, wss: expressWs.getWss(),  req}))

// This route goes last! Its our SSR Route
// If placed before this point it will override the API routes
app.use('/', ssr)

// Run Server
app.listen(port, () => {
	console.log('server listing on port ', port)
})
