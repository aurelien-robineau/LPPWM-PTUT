import Plant from "../Plant"
import CardMonitoring from "./Card"

const ConsumpMonitoring = () => {
	return (
		<>
			<div className="card-container-day">
				<CardMonitoring
					timeScale={"day"}
					variation={{ trend: 1, value: 3 }}
				/>
			</div>

			<div className="plant">
				<Plant />
			</div>

			<div className="card-container-week-month">
				<CardMonitoring
					timeScale={"week"}
					variation={{ trend: -1, value: 17 }}
					iconSize={14}
				/>

				<CardMonitoring
					timeScale={"month"}
					variation={{ trend: 1, value: 10 }}
					iconSize={14}
				/>
			</div>
		</>
	)
}

export default ConsumpMonitoring
