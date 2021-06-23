import { useEffect, useState } from 'react'
import { auth } from '../api/methods'
import { storage } from '../utils/constants'
import { checkToken, getStorage } from '../utils/index'

export const useAuth = () => {
	const [user, setUser] = useState<Object | boolean>(false)
	useEffect(() => {
		const userInfos = checkToken() ? getStorage(storage.USER_INFOS, localStorage) : false
		if (!userInfos && getStorage(storage.USER_INFOS, localStorage)) {
			auth.refreshToken()
		}
		setUser({ userInfos })
	}, [])
	return [user]
}