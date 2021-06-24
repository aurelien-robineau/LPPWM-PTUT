import { useEffect } from "react"
import { auth } from "../api/methods"
import Loader from "../components/Loader/Loader"

const FinishSignup = () => {
	useEffect(() => {
		const params = new URLSearchParams(window.location.search)

		auth.submitSignup({
			authorizationCode: params.get("code"),
			password: sessionStorage.getItem("PASSWORD"),
		})
	}, [])
	return <div className="finish-signup">
		<Loader />
		<div className="text">Création du compte</div>
	</div>
}

export default FinishSignup
