import { decode } from "jsonwebtoken"
import { storage } from "./constants"
import { PayloadToken, UserInfos } from "./types"

export const safeDeleteValueObject = (data: Object, keys: string[]): Object => {
	keys.forEach((key: string) => {
		if (data.hasOwnProperty(key)) {
			// @ts-ignore
			delete data[key]
		}
	})

	return data
}

export const getStorage = (value: string, storage: any) => {
	return JSON.parse(storage.getItem(value))
}

export const onResize = () => {
	document.body.style.setProperty(
		"--vh",
		`${document.documentElement.clientHeight / 100}px`
	)
	window.addEventListener("resize", onResize)
}

export const storeUserInfos = (data: UserInfos) => {
	const infos = safeDeleteValueObject(data, ["iat", "exp", "updatedAt", "createdAt"])
	localStorage.setItem(storage.USER_INFOS, JSON.stringify(infos))
}

export const storeToken = ({
	token,
	refreshToken,
}: PayloadToken) => {
	const value: any = decode(token || "")
	console.log(value)
	localStorage.setItem(storage.TOKEN, token || "")
	localStorage.setItem(storage.REFRES_TOKEN, refreshToken || "")
	// @ts-ignore
	localStorage.setItem(storage.EXP, JSON.stringify(value.exp * 1000) || 0)
	storeUserInfos(value)
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
	
	return Date.now() < expDate
}
