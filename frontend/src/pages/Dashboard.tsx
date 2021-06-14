import { useState, useEffect } from "react"
import Header from "../components/Header"
import Tracker from "../components/Tracker"
import ConsumpMonitoring from "../components/ConsumpMonitoring"
import Graph from "../components/Graph"
import ConsumpIdeas from "../components/ConsumpIdeas"

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
			<Tracker />
			<ConsumpMonitoring />
			<Graph />
			<ConsumpIdeas />
			<button onClick={() => setDarkMode(darkMode ? false : true)}>
				Switch theme
			</button>
		</div>
	)
}

export default Dashboard
