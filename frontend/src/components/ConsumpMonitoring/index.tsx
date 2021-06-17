import IconArrow from "../Icons/Arrow"

const ConsumpMonitoring = () => {
	return (
		<section className="conso-monitoring-section">
			<h2>Cartes de conso + plante</h2>

			<div className="conso-row">
				{/* bouléen jour */}
				<div className="day-card">
					<div className="card-content">
						<div>
							<span className="day-data">3</span>kw
							<span className="svg-container"><IconArrow size={20} /></span>
						</div>
						<div>
							<p>de plus que la veille</p>
						</div>
					</div>
				</div>

				<div>Plante</div>
			</div>

			<div className="conso-row">
				{/* bouléen semaine */}
				<div className="week-card">
					<div className="card-content">
						<div>
							<span className="week-data">17</span>kw
							<span className="svg-container"><IconArrow size={14} /></span>
						</div>
						<div>
							<p>de plus que la semaine dernière</p>
						</div>
					</div>
				</div>


				{/* bouléen mois */}
				<div className="month-card">
					<div className="card-content">
						<div>
							<span className="month-data">10</span>kw
							<span className="svg-container"><IconArrow size={14} /></span>
						</div>
						<div>
							<p>de plus que le mois dernier</p>
						</div>
					</div>
				</div>


			</div>
		</section>
	)
}

export default ConsumpMonitoring
