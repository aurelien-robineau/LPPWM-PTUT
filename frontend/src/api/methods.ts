
import { LabelList } from 'recharts'
import { ValuesGraph } from '../components/Graph/SelectItems'
import { getStorage, storeToken } from '../utils'
import { storage } from '../utils/constants'
import configAxios from './index'
interface ResUrl {
	data: { url?: string }
}

export const auth = {
	submitLogin(data: Object, setError: { (value: any): void; (arg0: string): void }) {
		configAxios.post("/v1/auth/signin", data)
			.then(res => {
				storeToken(res.data)
				window.location.href = "/dashboard"
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
	async getMeterList() {
		try {
			const res: any = await configAxios.post("/v1/usage-points/")
			return res
		} catch (error) {
			console.warn(error)
		}
	},
	async initGraph(): Promise<{ res: ValuesGraph[], list: { [key: string]: any }[] }> {
		try {
			const list: any = await dataUser.getMeterList()
			const listMeters = list.data.map((x: any) => x.id)
			const res: any = await configAxios.post("/v1/users/graph-data", { period: "DAY", graphs: ["average", ...listMeters] })
			return { res: res.data, list: list.data }
		} catch (error) {
			console.warn(error)
			return { res: [], list: [] }
		}
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