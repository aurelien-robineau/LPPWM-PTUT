import { decode } from "jsonwebtoken"
import { PayloadToken } from "./types"

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
}: PayloadToken) => {
	const value = decode(token || "")
	localStorage.setItem("TOKEN", token || "")
	localStorage.setItem("REFRESH_TOKEN", refreshToken || "")
	// @ts-ignore
	if (Date.now() >= value.payload.exp) {
		// @ts-ignore
		localStorage.setItem("EXP", value.payload.exp || "")
	}
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
	return keys
}

