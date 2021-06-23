import React from "react"
import { useDarkMode } from "../../hooks/darkTheme"
import { getStorage } from "../../utils"
import { storage } from "../../utils/constants"
import IconProfile from "../Icons/Profile"
import IconTheme from "../Icons/Theme"

const Header = () => {
	const user = getStorage(storage.USER_INFOS, localStorage).firstname
	const [darkMode, setDarkMode] = useDarkMode()

	const handleChangeTheme = () => {
		setDarkMode(!darkMode)
	}
	return (
		<div className="header">
			<div className="header__container">
				<h1>
					Bonjour, <span>{user}</span>
				</h1>
				<div className="icons">
					<button onClick={() => handleChangeTheme()}>
						<IconTheme size={40} />
					</button>
					<IconProfile size={40} />
				</div>
			</div>
		</div>
	)
}

export default Header
