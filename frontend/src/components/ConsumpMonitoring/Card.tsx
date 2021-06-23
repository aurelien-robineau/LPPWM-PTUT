import IconArrow from "../Icons/Arrow"

interface Variation {
	trend: number
	value: number
}

const CardMonitoring = ({
	timeScale,
	variation,
	iconSize,
}: {
	timeScale: string
	variation: Variation
	iconSize?: number
}) => {
	const { trend, value } = variation
	let timeComparison
	switch (timeScale) {
		case "day":
			timeComparison = "la veille"
			break
		case "week":
			timeComparison = "la semaine dernière"
			break

		default:
			timeComparison = "le mois dernier"
			break
	}

	return (
		<div className={`card-${timeScale}`}>
			<div className="card-content">
				<div>
					<span className={`data-${timeScale}`}>{value}<span className="data-unit">kw</span></span>
					<span className="svg-container">
						<IconArrow
							size={iconSize || 20}
							rotation={trend < 0 ? 90 : 0}
						/>
					</span>
				</div>
				<div>
					<p>
						{trend > 0 ? "de plus" : "de moins"} que{" "}
						{timeComparison}
					</p>
				</div>
			</div>
		</div>
	)
}

export default CardMonitoring
