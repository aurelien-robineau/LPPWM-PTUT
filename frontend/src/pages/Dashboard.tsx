import { useState, useEffect } from "react"
import Header from "../components/Header"

const Dashboard = () => {
	const [darkMode, setDarkMode] = useState(
		!!localStorage.getItem("DARK_THEME") || false
	)
	useEffect(() => {
		localStorage.setItem("DARK_THEME", darkMode.toString())
		document.documentElement.dataset.theme = darkMode ? "dark" : "light"
	}, [darkMode])

	return (
		<div className="dashboard-page">
			<Header />
			<button onClick={() => setDarkMode(darkMode ? false : true)}>
				Switch theme
			</button>
		</div>
	)
}

export default Dashboard
