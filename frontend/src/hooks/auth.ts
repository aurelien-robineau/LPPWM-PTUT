import { useState, useEffect } from 'react';
import { checkToken, storeToken } from '../utils/index';
import { StateAction } from './types';

export const useAuth = () => {
	const [user, setUser] = useState(false)

	useEffect(() => {
		checkToken()
	}, [user])
	// useEffect(() => {
	// 	if (action.action === "create") {
	// 		storeToken(action.payload)
	// 		setLogged(true)
	// 	} else if (action.action === "logout") {
	// 		setLogged(false)
	// 	}
	// }, [action])


	return user
}