import Header from "../components/Header"
import TrackerSvg from "../components/Tracker/trackerSvg"
import ConsumpMonitoring from "../components/ConsumpMonitoring"
import Graph from "../components/Graph"
import ConsumpIdeas from "../components/ConsumpIdeas"
import Plant from "../components/Plant"

const Dashboard = () => {
    return (
        <div className="dashboard-page">
            <Header />

            <div className="grid-container">
            {/* <Tracker /> */}
            <TrackerSvg />
            <ConsumpMonitoring />
            <Graph />
            <ConsumpIdeas />
            {/* <button onClick={() => }>
				Switch theme
			</button> */}
            </div>

        </div>
    )
}

export default Dashboard
