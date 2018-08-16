import { server, database } from '../../config'

module.exports = {
	database: {
		url: `mongodb://localhost/${database}`
	},
	googleAuth: {
		clientID: '443541868618-98u41tbu7r8h2j25d8m87em6au3af9tp.apps.googleusercontent.com',
		clientSecret: 'zfgooO9bgy9l9_k0tYZPaP3N',
		callbackURL: `${server}/auth/google/callback`,
	},
	facebookAuth: {
		clientID: '1347027622099102',
		clientSecret: 'b35d42a92dbd925b4edbe7d5b4648fcb',
		callbackURL: `${server}/auth/facebook/callback`,
	},
	secret: "xclkjhasdljvhasdkjbaxkjcbaxkcjbadkjfhajbvlkaj"
}