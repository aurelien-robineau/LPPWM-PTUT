import { useState, useEffect } from "react"
import { DataTracker } from "./types"

const cleanPercentage = (percentage: number) => {
	const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0 // we can set non-numbers to 0 here
	const isTooHigh = percentage > 100
	return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage
}

const ProgressRing = ({
	radius,
	stroke,
}: {
	radius: number
	stroke: number
}) => {
	const progress: number = 50
	const size: number = radius * 2

	radius = window.innerWidth > 1024 ? radius * 0.8 : radius
	const normalizedRadius: number = radius - stroke * 2
	const circ: number = normalizedRadius * 2 * Math.PI
	const strokeDashoffset: number = circ - (progress / 100) * circ
	const consumption: number = 18
	const goal: number = 20

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
				strokeDashoffset="0"
				strokeDasharray={`${circ} ${circ}`}
				style={{ strokeDashoffset }}
				strokeWidth={stroke}
				r={normalizedRadius}
				cx={radius}
				cy={radius}
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
