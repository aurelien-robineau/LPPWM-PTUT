import { useEffect } from "react"
import { auth } from "../api/methods"

const FinishSignup = () => {
	useEffect(() => {
		const params = new URLSearchParams(window.location.search)

		auth.submitSignup({
			authorizationCode: params.get("code"),
			password: sessionStorage.getItem("PASSWORD"),
		})
	}, [])
	return <div>Envoi des données</div>
}

export default FinishSignup
