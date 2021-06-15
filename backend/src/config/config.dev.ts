export default {
	port: 60000,
	frontendUrl: 'http://localhost:3000',
	database: {
		type: 'mysql',
		host: '127.0.0.1',
		port: 3306,
		username: 'root',
		database: 'enedis',
		synchronize: true,
		autoLoadEntities: true
	},
	enedis: {
		datahub: {
			baseUrl: 'https://gw.hml.api.enedis.fr',
			authorizeBaseUrl: 'https://gw.hml.api.enedis.fr',
			redirectUri: 'https://gw.hml.api.enedis.fr/redirect',
			clientId: '50f4ae9f-9818-4e03-b0e4-0a888c9b6cad',
			publicKey: '781c3f18-89fb-44b3-8053-52053f6e8793',
			privateKey: 'c8112d82-7c09-437c-97e0-4aaa37673802',
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
	secret: 'r9x6aoz78CimnAUJ1kWNumR1QY0KjqlM'
} as const