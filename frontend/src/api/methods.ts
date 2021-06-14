import axios from "axios"

export default {
	methods: {
		SubmitLogin(data: FormData) {
			axios.post("/login", data)
				.then(res => console.log(res))
				.catch(error => console.log(error))
		},
		SubmitSigin(data: FormData) {
			axios.post("/signin", data)
				.then(res => console.log(res))
				.catch(error => console.log(error))
		}
	}
}