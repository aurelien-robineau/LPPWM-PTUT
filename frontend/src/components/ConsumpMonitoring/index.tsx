import Plant from "../Plant"
import CardMonitoring from "./Card"

const ConsumpMonitoring = () => {
	return (
		<section className="conso-monitoring-section">
			<h2>Cartes de conso + plante</h2>

			<div className="conso-row">
				<CardMonitoring
					timeScale={"day"}
					variation={{ trend: 1, value: 3 }}
				/>

				<div className="plant-container">
					<Plant />
				</div>
			</div>

			<div className="conso-row">
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
		</section>
	)
}

export default ConsumpMonitoring
