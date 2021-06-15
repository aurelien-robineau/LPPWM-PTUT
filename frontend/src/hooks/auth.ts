import { useState, useEffect } from 'react';

export const useAuth = () => {
	const [jwt] = useState(JSON.parse(localStorage.getItem("jwt") || "{}"))
	const userInfos = useState(JSON.parse(localStorage.getItem("userInfos") || "{}"))
	const [logged, setLogged] = useState(false)
	useEffect(() => {
		if (jwt && userInfos) {
			setLogged(true)
		} else {
			setLogged(false)
		}
	}, [jwt, userInfos])


	return [logged, setLogged]
}