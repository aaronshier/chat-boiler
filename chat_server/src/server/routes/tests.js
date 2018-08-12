import express from 'express'

const app = express()

import { server, demoObject } from '../../config'

app.get('/', (req, res) => {
	const { shuffle, source } = demoObject
	let lang = req.query.lang
	const response = shuffle(source)
	console.log('response => ', response.length)
	console.log('lang => ', lang)
  	res.json({response, lang})
})

export default app