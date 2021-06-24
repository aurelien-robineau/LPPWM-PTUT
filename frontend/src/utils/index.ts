import { decode } from "jsonwebtoken"
import { storage } from "./constants"
import configAxios from '../api/index'
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
	configAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`
	const value: any = decode(token || "")
	localStorage.setItem(storage.TOKEN, JSON.stringify(token) || "")
	localStorage.setItem(storage.REFRESH_TOKEN, JSON.stringify(refreshToken) || "")
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
	const expDate = getStorage(storage.EXP, localStorage) || null
	if (!expDate) return false
	return Date.now() < expDate
}

export const getThemePalette = (themeColor: any) => {
	let currentPalette = []
	for (const property in themeColor) {
		currentPalette.push(property)
	}
	return currentPalette.filter(
		color => !/text|white|background|gray|black/gim.test(color)
	)
}


export const startOfWeek = (date: Date) => {
	const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1)
	return new Date(date.setDate(diff))
}

export const endOfWeek = (date: Date) => {
	const lastday = date.getDate() - (date.getDay() - 1) + 6
	return new Date(date.setDate(lastday))
}

export const formatDate = (d: Date) => {
	let day = new Intl.DateTimeFormat("fr", { day: '2-digit' }).format(d);
	let month = new Intl.DateTimeFormat("fr", { month: "short" }).format(d);
	return `${day} ${month}`
}
