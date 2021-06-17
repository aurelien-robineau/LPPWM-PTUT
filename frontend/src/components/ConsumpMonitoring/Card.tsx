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




	return (
		<div className={`card-${timeScale}`}>
			<div className="card-content">
				<div>
					<span className={`data-${timeScale}`}>{value}</span>
					kw
					<span className="svg-container">
						<IconArrow
							size={iconSize || 20}
							rotation={trend < 0 ? 90 : 0}
						/>
					</span>
				</div>
				<div>
					<p>
						{/* TODO: Change end of sentence */}
						{trend > 0 ? "de plus" : "de moins"} que la veille
					</p>
				</div>
			</div>
		</div>
	)
}

export default CardMonitoring
