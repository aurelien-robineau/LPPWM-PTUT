import { useEffect } from "react"
import { useState } from "react"
import { dataUser } from "../../api/methods"

const ProgressRing = ({
	radius,
	stroke,
}: {
	radius: number
	stroke: number
}) => {
	radius = window.innerWidth > 1024 ? radius * 0.8 : radius
	const size: number = radius * 2
	const normalizedRadius: number = radius - stroke * 2
	const circ: number = normalizedRadius * 2 * Math.PI
	const [strokeDashoffset, setStrokeDashoffset] = useState<number>(0)
	const [data, setData] = useState<any>({})
	useEffect(() => {
		const fetchData = async () => {
			const res = await dataUser.tracker()
			setData(res)
		}
		fetchData()
	}, [])

	useEffect(() => {
		if (data?.percentage) {
			setStrokeDashoffset(circ - (data?.percentage / 100) * circ)
		}
	}, [data, circ])

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
				className={`tracker__progress ${data?.percentage > 100 ? "over-100" : ""}`}
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
				{Math.floor(data?.current / 1000)} kW
			</text>
			<text
				className="tracker__goal"
				x="50%"
				y="65%"
				dominantBaseline="middle"
				textAnchor="middle"
			>
				{data?.goal / 1000} kW
			</text>
		</svg>
	)
}

export default ProgressRing
