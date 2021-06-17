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

	const handleSubmit = (event: any) => {
		event.preventDefault()

		setSubmitting(true)
		auth.submitLogin(formData)

		setTimeout(() => {
			setSubmitting(false)
		}, 3000)
	}

	return [handleSubmit, setFormData]
}
