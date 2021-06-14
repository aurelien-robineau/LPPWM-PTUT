import React from "react"
import IconProfile from "../Icons/Profile"

const Header = () => {
	const user = "Michelle"

	return (
		<div>
			<h2>Bonjour {user}</h2>
			<IconProfile size={40} />
		</div>
	)
}

export default Header
