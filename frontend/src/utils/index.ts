import { decode } from "jsonwebtoken"
import { global } from "../api/methods"
import { storage } from "./constants"
import { PayloadToken } from "./types"

export const getStorage = (value: any, storage: any) => {
	return JSON.parse(storage.getItem(value))
}


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
	console.log(value)

	localStorage.setItem(storage.TOKEN, token || "")
	localStorage.setItem(storage.REFRES_TOKEN, refreshToken || "")
	// @ts-ignore
	if (Date.now() >= value.exp) {
		// @ts-ignore
		localStorage.setItem(storage.EXP, value.exp || "")
	} else {
		global.refreshToken()
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



export const checkToken = () => {
	const expDate = getStorage(storage.EXP, localStorage) * 1000
	console.log({ now: Date.now(), expDate })
	if (Date.now() > getStorage(storage.EXP, localStorage)) {
		console.log("Change Token");
	} else {
		console.log("Good Token")
	}
}

