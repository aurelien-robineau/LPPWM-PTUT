import { useState, useReducer } from "react"
import logo from "../img/logo-gris.png"

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

				<div className="login-form-container">
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
				<div className="logo"><img src={logo} alt="logo-gris" width="30" /></div>
				</div>


				<div className="login-informations-container">
					<h2>Maîtrisez votre <span className="bold">consommation d’électricité</span> avec <span className="bold">Enyu</span></h2>

					<div className="feature-row">
						<div className="feature-text-container">
							<p>Fixez et atteignez votre <span className="bold">objectif de consommation.</span></p>
						</div>

						<div className="tracker"></div>
					</div>

					<div className="feature-row">
						<div className="graph"></div>

						<div className="feature-text-container">
							<p>Fixez et atteignez votre <span className="bold">objectif de consommation</span>.</p>
						</div>						
					</div>

					<div className="feature-row">
						<div className="plant"></div>
						
						<div className="feature-text-container">
							<p>Trackez et comparez votre consommation grace à des <span className="bold">graphiques</span>.</p>
						</div>						
					</div>

				</div>


			</div>
		</div>
	)
}

export default Login
