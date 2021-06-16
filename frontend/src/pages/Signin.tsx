import { useState, useReducer } from "react"
import logo from "../img/logo-gris.png"

const formReducer = (state: any, event: any) => {
	return {
		...state,
		[event.name]: event.value,
	}
}

const Signin = () => {
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
		<div className="signin-page">
			<div className="container">
				<h1>S’inscrire sur Enyu</h1>
				{submitting && (
					<div>
						You are submitting the following:
						<ul>
							{Object.entries(formData).map(
								([name, value]: Array<any>) => (
									<li key={name}>
										<strong>{name}</strong>:
										{value.toString()}
									</li>
								)
							)}
						</ul>
					</div>
				)}
				<form onSubmit={handleSubmit}>
					<label htmlFor="password">Mot de passe *</label>
					<input
						type="password"
						id="password"
						onChange={handleChange}
					/>
					<button type="submit">S'inscrire</button>
				</form>
				<div className="create-account">
					Déjà un compte ? <a href="/login">Connectez-vous</a>
				</div>
				<div className="logo"><img src={logo} alt="logo-gris" width="30" /></div>
				<span className="require-field">* Champs obligatoires</span>
			</div>
		</div>
	)
}

export default Signin
