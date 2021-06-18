import configAxios from './index'
interface ResUrl {
	data: { url?: string }
}

export const auth = {
	submitLogin(data: Object, setError: React.Dispatch<React.SetStateAction<string>>) {
		// TODO: Retrive token and refresh token from res
		configAxios.post("/v1/auth/signin", data)
			.then(res => console.log(res))
			.catch((error) => {
				const { message } = error.response.data
				if (!Array.isArray(message)) {
					setError(message)
				} else {
					const a = message.map(x => `<span>${x}</span>`)
					setError(a.join(""))
				}
			})
	},
	submitSignup(data: Object) {
		// TODO: Link to form Signup
		configAxios.post("/v1/auth/signup", data)
			.then(res => console.log(res))
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
}