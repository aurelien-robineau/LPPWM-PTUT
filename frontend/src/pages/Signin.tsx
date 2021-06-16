import { useState, useReducer } from "react"
import IconLogo from "../components/Icons/Logo"

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

				<div className="signin-form">
					<div className="form-container">
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
						
						<div className="create-account">
							Déjà un compte ? <a href="/login">Connectez-vous</a>
						</div>
						<div className="logo">
								<IconLogo size={30} />
						</div>
						<span className="require-field">* Champ obligatoire</span>
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

export default Signin
