import axios from "axios"

interface ResUrl {
	url: string
}


export const auth = {
	submitLogin(data: Object) {
		// TODO: Retrive token and refresh token from res
		axios.post("/v1/auth/signin", data)
			.then(res => console.log(res))
			.catch(error => console.log(error))
	},
	submitSignup(data: Object) {
		// TODO: Link to form Signup
		axios.post("/signin", data)
			.then(res => console.log(res))
			.catch(error => console.log(error))
	},
	async getUrlOAuth() {
		const res: ResUrl = await axios.post("/v1/auth/enedis-authorization-url")
		const { url } = res
		if (!url) {
			console.error("Unable to get URL")
			return "http://www.test.com"
		}
		return url
	}
}