import { useState } from 'react';
import { storage } from '../utils/constants';
import { checkToken, getStorage } from '../utils/index';

export const useAuth = () => {
	let userInfos = checkToken() ? getStorage(storage.USER_INFOS, localStorage) : undefined
	const [user] = useState<Object>({ ...userInfos })
	return user
}