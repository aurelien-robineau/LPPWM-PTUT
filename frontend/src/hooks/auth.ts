import { useState, useEffect } from 'react';
import { storeToken } from '../utils/index';
import { StateAction } from './types';

export const useAuth = () => {
	const [jwt] = useState(JSON.parse(localStorage.getItem("TOKEN") || "{}"))
	const userInfos = useState(JSON.parse(localStorage.getItem("userInfos") || "{}"))
	const [action, setAction] = useState<StateAction>({ action: "", payload: {} })
	const [logged, setLogged] = useState(false)


	useEffect(() => {
		if (action.action === "create") {
			storeToken(action.payload)
			setLogged(true)
		} else if (action.action === "logout") {
			setLogged(false)
		}
	}, [action])

	useEffect(() => {
		if (jwt && userInfos) {
			setLogged(true)
		} else {
			setLogged(false)
		}
	}, [jwt, userInfos])


	return [logged, setAction]
}