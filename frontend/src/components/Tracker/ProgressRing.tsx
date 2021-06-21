import { DataTracker } from "./types"

const ProgressRing = ({
	radius,
	stroke,
	data,
}: {
	radius: number
	stroke: number
	data: DataTracker
}) => {
	const { progress, goal, consumption } = data
	const size = radius * 2
	const normalizedRadius = radius - stroke * 2
	const circumference = normalizedRadius * 2 * Math.PI
	// const strokeDashoffset = circumference - (progress / 100) * circumference
	const strokeDashoffset = Math.abs(
		circumference - (progress / 100) * circumference
	)

	// TODO:
	// * Understand concept of dashoofset to always perfectly start at the same spot

	return (
		<svg height={size} width={size}>
			<circle
				className="tracker__path-follow"
				fill="transparent"
				strokeWidth={3}
				r={normalizedRadius * 1.17}
				cx={radius}
				cy={radius}
			/>
			<circle
				className="tracker__progress"
				fill="transparent"
				// strokeDashoffset="0"
				strokeDasharray={`${circumference}`}
				style={{ strokeDashoffset }}
				strokeWidth={stroke}
				r={normalizedRadius * 1.17}
				cx={radius}
				cy={radius}
				transform={`rotate(-90 ${radius} ${radius})`}
			/>
			<circle
				className="tracker__inner"
				stroke="transparent"
				r={normalizedRadius}
				cx={radius}
				cy={radius}
			/>
			<text
				className="tracker__usage"
				x="50%"
				y="50%"
				dominantBaseline="middle"
				textAnchor="middle"
			>
				{consumption} kW
			</text>
			<text
				className="tracker__goal"
				x="50%"
				y="65%"
				dominantBaseline="middle"
				textAnchor="middle"
			>
				{goal} kW
			</text>
		</svg>
	)
}

export default ProgressRing
