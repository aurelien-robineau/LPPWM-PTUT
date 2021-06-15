export default {
	port: 60000,
	frontendUrl: null,
	database: {
		type: 'mysql',
		host: null,
		port: 3306,
		username: null,
		password: null,
		database: null,
		synchronize: false,
		autoLoadEntities: true
	},
	enedis: {
		datahub: {
			baseUrl: 'https://gw.prd.api.enedis.fr',
			authorizeBaseUrl: 'https://mon-compte-particulier.enedis.fr',
			redirectUri: null,
			clientId: null,
			publicKey: null,
			privateKey: null,
			authorizationDuration: 'P1Y'
		},
		opendata: {
			baseUrl: 'https://data.enedis.fr'
		}
	},
	gouv: {
		apigeo: {
			baseUrl: 'https://geo.api.gouv.fr'
		}
	},
	secret: 'KAxpBTRJ4UqPof1ZjVG0f2jAJ6SKnpH4',
	refreshSecret: 'LB8OGcDgCKjfssE6nMIHj5kJyzGbSYxe'
} as const