import { useState, useReducer } from "react"
import { auth } from "../api/methods"
import IconLogo from "../components/Icons/Logo"
import InfosApp from "../components/InfosApp"

const formReducer = (state: any, event: any) => {
    return {
        ...state,
        [event.name]: event.value,
    }
}

const Login = () => {
    const [formData, setFormData] = useReducer(formReducer, {})
    const [, setSubmitting] = useState(false)

    const handleSubmit = (event: any) => {
        event.preventDefault()
        setSubmitting(true)
        auth.submitLogin(formData)

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

    // TODO: Handle error on form submission
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
                                <IconLogo size={30} />
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
