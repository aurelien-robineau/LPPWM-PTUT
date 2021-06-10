const PROD_CONFIG = {
	port: 60000,
	frontendUrl: null,
	database: {
		type: 'mysql',
		host: null,
		port: 3306,
		username: null,
		password: null,
		database: null
	},
	enedis: {
		datahub: {
			publicKey: null,
			privateKey: null
		}
	}
} as const

const DEV_CONFIG = {
	port: 60000,
	frontendUrl: 'http://localhost:3000',
	database: {
		type: 'mysql',
		host: '127.0.0.1',
		port: 3306,
		username: 'root',
		database: 'enedis'
	},
	enedis: {
		datahub: {
			publicKey: '6b87cecb-21b6-47bc-9a67-aaffca73529c',
			privateKey: 'd7883efa-e01e-463d-8af2-674f88f9e13c'
		}
	}
} as const

export default process.env.ENV === 'PROD' ? PROD_CONFIG : DEV_CONFIG