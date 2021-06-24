import { useState, useReducer } from "react"
import { auth } from "../api/methods"
const formReducer = (state: any, event: any) => {
	return {
		...state,
		[event.name]: event.value,
	}
}


export function useForm(type: string): any[] {
	const [formData, setFormData] = useReducer(formReducer, { code: "AunMWuDO8YZbrdlaRgGP4z51X8eEky" })
	const [, setSubmitting] = useState(false)
	const [error,] = useState("")

	const handleSubmit = (event: any, urlOAuth: string | null = null) => {
		event.preventDefault()

		setSubmitting(true)
		if (urlOAuth) {
			window.location.href = urlOAuth.toString()
		}
		switch (type) {
			case "signup":
				auth.submitSignup(formData)
				break;

			default:
				console.warn("Error, no type form provided")
				break;
		}

		setTimeout(() => {
			setSubmitting(false)
		}, 3000)
	}

	return [handleSubmit, setFormData, formData, error]
}
