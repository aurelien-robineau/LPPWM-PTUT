import { useEffect, useState } from "react"
import { useForm } from "../hooks/form"
import { auth } from "../api/methods"
import IconLogo from "../components/Icons/Logo"
import InfosApp from "../components/InfosApp"

const Signin = () => {
    const [handleSubmit, setFormData, formData] = useForm()
    const [urlEnedis, setUrlEnedis] = useState("")

    useEffect(() => {
        ;(async () => {
            const url = await auth.getUrlOAuth()
            setUrlEnedis(url)
        })()
    }, [])

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
                        <form
                            onSubmit={(e) => {
                                sessionStorage.setItem(
                                    "password",
                                    formData.password
                                )
                                handleSubmit(e, urlEnedis)
                            }}
                        >
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
                                <IconLogo />
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
