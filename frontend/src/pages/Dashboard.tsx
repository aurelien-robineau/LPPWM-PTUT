import Header from "../components/Header"
import Tracker from "../components/Tracker"
import ConsumpMonitoring from "../components/ConsumpMonitoring"
import Graph from "../components/Graph"
import ConsumpIdeas from "../components/ConsumpIdeas"

const Dashboard = () => {
	return (
		<div className="dashboard-page">
			<Header />
			<Tracker />
			<ConsumpMonitoring />
			<Graph />
			<ConsumpIdeas />
			{/* <button onClick={() => }>
				Switch theme
			</button> */}
		</div>
	)
}

export default Dashboard
