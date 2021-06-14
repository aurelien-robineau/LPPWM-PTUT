import React from "react"
import IconProfile from "../Icons/Profile"

const Header = () => {
	const user = "Michelle"

	return (
		<div className="header">
			<div className="header__container">
				<h2>
					Bonjour, <span>{user}</span>
				</h2>
				<IconProfile size={40} />
			</div>
		</div>
	)
}

export default Header
