import { useEffect } from "react"
import IconLogo from "../components/Icons/Logo"
import InfosApp from "../components/InfosApp"
import { useForm } from "../hooks/form"

const Login = () => {
	const [handleSubmit, setFormData, , error] = useForm("login")
	const handleChange = (event: any) => {
		setFormData({
			name: event.target.name,
			value: event.target.value,
		})
	}

	useEffect(() => {
		console.log({ error })
	}, [error])

	// TODO: CSS Style Error form
	return (
		<div className="login-page">
			<div className="container">
				<div className="login-form">
					<div className="form-container">
						<h1>Accéder à Enyu</h1>
						
						<form onSubmit={handleSubmit}>
							<p className="error-msg">{error}</p>
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
