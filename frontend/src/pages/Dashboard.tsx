import Header from "../components/Header"
import TrackerSvg from "../components/Tracker/trackerSvg"
import ConsumpMonitoring from "../components/ConsumpMonitoring"
import Graph from "../components/Graph"
import ConsumpIdeas from "../components/ConsumpIdeas"

const Dashboard = () => {
    return (
        <div className="dashboard-page">
            <Header />
            {/* <Tracker /> */}
            <TrackerSvg />
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
