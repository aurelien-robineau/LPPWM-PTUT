import { useEffect } from "react"

const FinishSignup = () => {
	useEffect(() => {
		console.log({ window: window.location })
	}, [])
	return <div>Envoi des données</div>
}

export default FinishSignup
