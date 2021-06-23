import { useState } from "react"
import { auth } from "../api/methods"
import IconLogo from "../components/Icons/Logo"
import InfosApp from "../components/InfosApp"
import { useForm } from "../hooks/form"

const Login = () => {
	const [error, setError] = useState<any>("")
	const [, setFormData, formData] = useForm("login")
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
						<div
							className={`error-msg ${
								error !== "" ? "opened" : ""
							}`}
							dangerouslySetInnerHTML={{ __html: error }}
						/>
						<form
							onSubmit={e => {
								e.preventDefault()
								auth.submitLogin(formData, setError)
							}}
						>
							<label htmlFor="email">
								Email ou identifiant client Enedis
							</label>
							<input
								name="identifier"
								type="text"
								id="email"
								onChange={handleChange}
							/>
							<label htmlFor="password">Mot de passe</label>
							<input
								name="password"
								autoComplete="true"
								type="password"
								id="password"
								onChange={handleChange}
							/>
							<button type="submit">Se connecter</button>
							<div className="create-account">
								Pas de compte ?{" "}
								<a href="/signin">Inscrivez-vous</a>
							</div>
							<div className="logo">
								<IconLogo />
							</div>
						</form>
					</div>
				</div>
				<InfosApp />
			</div>
		</div>
	)
}

export default Login
