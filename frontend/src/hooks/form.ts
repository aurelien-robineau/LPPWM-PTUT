import { useState, useReducer } from "react"
import { auth } from "../api/methods"
const formReducer = (state: any, event: any) => {
	return {
		...state,
		[event.name]: event.value,
	}
}


export function useForm() {
	const [formData, setFormData] = useReducer(formReducer, {})
	const [, setSubmitting] = useState(false)

	const handleSubmit = (event: any, urlOAuth: string | null = null) => {
		event.preventDefault()

		setSubmitting(true)
		if (urlOAuth) {
			window.location.href = urlOAuth.toString()
		}
		auth.submitLogin(formData)

		setTimeout(() => {
			setSubmitting(false)
		}, 3000)
	}

	return [handleSubmit, setFormData, formData]
}
