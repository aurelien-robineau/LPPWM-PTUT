import { useState, useEffect } from "react"

const Dashboard = () => {
	const [darkMode, setDarkMode] = useState(
		!!localStorage.getItem("DARK_THEME") || false
	)
	useEffect(() => {
		localStorage.setItem("DARK_THEME", darkMode.toString())
	}, [darkMode])


	return (
		<div>
			Dashboard
			<button onClick={() => setDarkMode(darkMode ? false : true)}>
				Switch theme
			</button>
		</div>
	)
}

export default Dashboard
