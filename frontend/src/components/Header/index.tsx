import React from "react"
import { useDarkMode } from "../../hooks/darkTheme"
import IconProfile from "../Icons/Profile"
import IconTheme from "../Icons/Theme"

const Header = () => {
	const user = "Michelle"
	const [darkMode, setDarkMode] = useDarkMode()

	const handleChangeTheme = () => {
		setDarkMode(!darkMode)
	}
	return (
		<div className="header">
			<div className="header__container">
				<h2>
					Bonjour, <span>{user}</span>
				</h2>
				<div className="icons">
					<button onClick={() => handleChangeTheme()}>
						<IconTheme size={25} />
					</button>
					<IconProfile size={40} />
				</div>
			</div>
		</div>
	)
}

export default Header
