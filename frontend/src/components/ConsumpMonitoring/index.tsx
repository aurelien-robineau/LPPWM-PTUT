import IconArrowUp from "../Icons/ArrowUp"
import IconArrowDown from "../Icons/ArrowDown"

const ConsumpMonitoring = () => {
	return (
		<section>
			<h2>Cartes de conso + plante</h2>

			{/* if conso hier > conso avant-hier */}
			<div className="day-conso-card">
				<div>
					<span className="day-data">3</span>kw
					<IconArrowUp size={20} />
				</div>
				<div>
					<p>de plus que la veille</p>
				</div>
			</div>

			{/* else */}
			<div className="day-conso-card">
				<div>
					<span className="day-data">2</span>kw
					<IconArrowDown size={20} />
				</div>
				<div>
					<p>de moins que la veille</p>
				</div>
			</div>


			<div className="conso-row">
				{/* if conso semaine > conso avant-semaine */}
				<div className="week-conso-card">
					<div>
						<span className="week-data">17</span>kw
						<IconArrowUp size={14} />
					</div>
					<div>
						<p>de plus que la semaine dernière</p>
					</div>
				</div>

				{/* else */}
				<div className="week-conso-card">
					<div>
						<span className="week-data">17</span>kw
						<IconArrowDown size={14} />
					</div>
					<div>
						<p>de moins que la semaine dernière</p>
					</div>
				</div>


				{/* if conso mois > conso avant-mois */}
				<div className="month-conso-card">
					<div>
						<span className="month-data">10</span>kw
						<IconArrowUp size={14} />
					</div>
					<div>
						<p>de plus que le mois dernier</p>
					</div>
				</div>

				{/* else */}
				<div className="month-conso-card">
					<div>
						<span className="month-data">10</span>kw
						<IconArrowDown size={14} />
					</div>
					<div>
						<p>de moins que le mois dernier</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ConsumpMonitoring
