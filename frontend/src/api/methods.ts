import { storeToken } from '../utils'
import configAxios from './index'
interface ResUrl {
	data: { url?: string }
}

export const auth = {
	submitLogin(data: Object, setError: { (value: any): void; (arg0: string): void }) {
		// TODO: Retrive token and refresh token from res
		configAxios.post("/v1/auth/signin", data)
			.then(res => {
				console.log("Hello", { res });

				configAxios.defaults.headers["Authorization"] = `Bearer ${res.data.token}`
				storeToken(res.data)
				return
			})
			.catch((error) => {
				if (!error.response) {
					return
				}
				const { message } = error.response.data
				if (!Array.isArray(message)) {
					setError(`<span>${message}</span>`)
				} else {
					setError(message.map(x => `<span>${x}</span>`).join(""))
				}
			})
	},
	submitSignup(data: Object) {
		configAxios.post("/v1/auth/signup", data)
			.then(res => {
				storeToken(res.data)
				console.log(res)
			})
			.catch(error => {
				console.warn(error.response.data)
			})
	},
	async getUrlOAuth() {
		// TODO: Remove test URL
		const res: ResUrl = await configAxios.post("/v1/auth/enedis-authorization-url")
		const { url } = res.data
		if (!url) {
			console.warn("Unable to get URL")
		}
		return url
	},
}

export const global = {
	checkAPILive(): void {
		configAxios.get("/")
			.then(res => console.log(res.data))
			.catch(error => console.log(error))
	},
	refreshToken() {
		configAxios.post("/v1/users/token").then(res => {
			configAxios.defaults.headers["Authorization"] = `Bearer ${res.data.token}`
			storeToken(res.data)
		})
	}
}

export const dataUser = {
	tracker() {
		configAxios.get("/")
			.then(res => console.log(res.data))
			.catch(error => console.log(error))
	},
	initGraph() {
		configAxios.post("/")
	},
	initTracker(data: string) {
		configAxios.get("/v1/data/tracker", { data })
			.then(res => res.data)
			.catch(error => console.log(error.response.data))
	}
}

