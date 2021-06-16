import { useEffect } from "react"
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

const Signin = () => {
    const [formData, setFormData] = useReducer(formReducer, {})
    const [, setSubmitting] = useState(false)

    const [, setUrlEnedis] = useState("")

    useEffect(() => {
        ;(async () => {
            const url = await auth.getUrlOAuth()
            setUrlEnedis(url)
        })()
    }, [])
    const handleSubmit = (event: any) => {
        event.preventDefault()
        console.log(formData)
        sessionStorage.setItem("password", formData.password)
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

    // TODO: Handle error on form submission
    return (
        <div className="signin-page">
            <div className="container">
                <div className="signin-form">
                    <div className="form-container">
                        <h1>S’inscrire sur Enyu</h1>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="password">Mot de passe *</label>
                            <input
                                autoComplete="new-password"
                                name="password"
                                type="password"
                                id="password"
                                onChange={handleChange}
                            />
                            <button type="submit">S'inscrire</button>

                            <div className="create-account">
                                Déjà un compte ?{" "}
                                <a href="/login">Connectez-vous</a>
                            </div>
                            <div className="logo">
                                <IconLogo size={30} />
                            </div>
                            <span className="require-field">
                                * Champ obligatoire
                            </span>
                        </form>
                    </div>
                </div>
                <InfosApp />
            </div>
        </div>
    )
}

export default Signin
