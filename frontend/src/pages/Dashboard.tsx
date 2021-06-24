import Header from "../components/Header"
import ConsumpMonitoring from "../components/ConsumpMonitoring"
import Graph from "../components/Graph"
import ConsumpIdeas from "../components/ConsumpIdeas"
import Tracker from "../components/Tracker"

const Dashboard = () => {
	return (
		<div className="dashboard-page">
			<Header />
			<div className="title">
			<h2 className="desktop-block title-tracker">Mon objectif de consommation</h2>
			<h2 className="desktop-block title-tips">Mes astuces</h2>
			</div>
			<div className="grid-container">
				<Tracker />
				<ConsumpMonitoring />
				<Graph />
				<ConsumpIdeas />
			</div>
		</div>
	)
}

export default Dashboard
