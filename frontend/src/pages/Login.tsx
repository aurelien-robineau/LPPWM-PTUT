import { useState, useReducer } from "react"
import IconLogo from "../components/Icons/Logo"

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

				<div className="login-form">
					<div className="form-container">
						<h1>Accéder à Enyu</h1>
						<form onSubmit={handleSubmit}>
							<label htmlFor="email">
								Email ou identifiant client Enedis
							</label>
							<input
								type="text"
								id="email"
								onChange={handleChange}
							/>
							<label htmlFor="password">Mot de passe</label>
							<input
								autoComplete="true"
								type="password"
								id="password"
								onChange={handleChange}
							/>
							<button type="submit">Se connecter</button>
							<div className="create-account">
								Pas de compte ? <a href="/signin">Inscrivez-vous</a>
							</div>
							<div className="logo">
								<IconLogo size={30} />
							</div>
						</form>
					</div>


				</div>

				<div className="login-informations-container">
					<h2>
						Maîtrisez votre{" "}
						consommation d’électricité{" "}
						avec <span className="bold-800">Enyu</span>
					</h2>

					<div className="feature-tracker-row">
						<div className="feature-text-container">
							<p>
								Fixez et atteignez votre{" "}
								<span className="bold-800">
									objectif de consommation.
								</span>
							</p>
						</div>

						<div className="tracker"></div>
					</div>

					<div className="feature-graph-row">
						<div className="graph"></div>

						<div className="feature-text-container">
							<p>
								Trackez et comparez votre consommation grace à
								des <span className="bold-800">graphiques</span>.
							</p>
						</div>
					</div>

					<div className="feature-plant-row">
						<div className="feature-text-container">
							<div className="feature-paragraph-container">
								<p>
									Faites pousser Planty en maintenant votre
									consommation inférieur à celle{" "}
									<span className="bold-800">
										moyenne des foyers similaires de votre
										région
									</span>.
								</p>
								<p>
									Elle vous donnera toutes les{" "}
									<span className="bold-800">
										astuces écologiques
									</span>{" "}
									nécessaires à sa croissance.
								</p>
							</div>
						</div>

						<div className="plant"></div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
