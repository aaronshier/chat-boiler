import { server } from '../../config'

module.exports = {
	database: {
		url: 'mongodb://localhost/hermn_ssr_mui'
	},
	googleAuth: {
		clientID: '443541868618-98u41tbu7r8h2j25d8m87em6au3af9tp.apps.googleusercontent.com',
		clientSecret: 'zfgooO9bgy9l9_k0tYZPaP3N',
		callbackURL: `${server}/auth/google/callback`,
	},
	facebookAuth: {
		clientID: '896605267054808',
		clientSecret: '28f6a7d2842d5f9ba19e449131694902',
		callbackURL: `${server}/auth/facebook/callback`,
	}
}