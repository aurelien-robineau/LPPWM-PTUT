import { useState, useReducer } from "react"

const formReducer = (state: any, event: any) => {
	return {
		...state,
		[event.name]: event.value,
	}
}

const Login = () => {
	const [formData, setFormData] = useReducer(formReducer, {})
	const [submitting, setSubmitting] = useState(false)

	const handleSubmit = (event: any) => {
		event.preventDefault()
		setSubmitting(true)

		setTimeout(() => {
			setSubmitting(false)
		}, 3000)
	}

	const handleChange = (event: any) => {
		setFormData({
			name: event.target.name,
			value: event.target.value,
		})
	}

	return (
		<div className="login-page">
			<div className="container">
				<h1>Accéder à Enyu</h1>
				<form onSubmit={handleSubmit}>
					<label htmlFor="email">
						Email ou identifiant client Enedis
					</label>
					<input type="text" id="email" onChange={handleChange} />
					<label htmlFor="password">Mot de passe</label>
					<input
						autoComplete="true"
						type="password"
						id="password"
						onChange={handleChange}
					/>
					<button type="submit">Se connecter</button>
				</form>
				<div className="create-account">
					Pas de compte ? <a href="/signin">Inscrivez-vous</a>
				</div>
				<div className="plant">Plante à mettre</div>
			</div>
		</div>
	)
}

export default Login
