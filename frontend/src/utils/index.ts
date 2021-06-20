import { decode } from "jsonwebtoken"

export const onResize = () => {
	document.body.style.setProperty(
		"--vh",
		`${document.documentElement.clientHeight / 100}px`
	)
	window.addEventListener("resize", onResize)
}

export const storeToken = ({
	token,
	refreshToken,
}: {
	token?: string
	refreshToken?: string
}) => {
	const value = decode(token || "")
	localStorage.setItem("TOKEN", token || "")
	localStorage.setItem("REFRESH_TOKEN", refreshToken || "")
	// @ts-ignore
	localStorage.setItem("EXP", value.payload.exp || "")
}


export const getAllKeys = (array: Object[]) => {
	let keys: string[] = []
	array.forEach(obj => {
		for (const key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key) && !keys.includes(key)) {
				keys.push(key)
			}
		}
	})

	console.log(keys)
	return keys
}
