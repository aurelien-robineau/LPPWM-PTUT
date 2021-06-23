
import { getStorage, storeToken } from '../utils'
import { storage } from '../utils/constants'
import configAxios from './index'
import { DataTracker } from './types'
interface ResUrl {
	data: { url?: string }
}

export const auth = {
	submitLogin(data: Object, setError: { (value: any): void; (arg0: string): void }) {
		// TODO: Retrive token and refresh token from res
		configAxios.post("/v1/auth/signin", data)
			.then(res => {
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
				window.location.href = "/dashboard"
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
	async refreshToken() {
		try {
			const refreshToken = getStorage(storage.REFRESH_TOKEN, localStorage)
			const res = await configAxios.post("/v1/users/token", { refreshToken })
			storeToken(res.data)
		} catch (error) {
			console.warn(error)
		}
	},
}

export const global = {
	checkAPILive(): void {
		configAxios.get("/")
			.then(res => console.log(res.data))
			.catch(error => console.log(error))
	}
}

export const dataUser = {
	getMeterList() {
		configAxios.post("/v1/usage-points/")
			.then(res => {
				console.log({ usage: res.data })
				localStorage.setItem(storage.METER_LIST, JSON.stringify(res.data))
				return
			})
			.catch(error => console.warn(error))
	},
	initGraph(data: DataTracker = { period: "DAY", graphs: ["average"] }) {
		configAxios.post("/v1/users/graph-data", data)
			.then(res => console.log(res.data))
			.catch(error => console.warn(error))
	},
	async tracker() {
		try {
			const res = await configAxios.post("/v1/users/tracker-data")
			return res.data
		} catch (error) {
			console.warn(error)
		}
	},
	async comparisonConsumption() {
		try {
			const res = await configAxios.post("/v1/users/comparison-data")
			return res.data
		} catch (error) {
			console.warn(error)
		}
	}
}