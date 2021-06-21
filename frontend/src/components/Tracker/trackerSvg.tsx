import ProgressRing from "./ProgressRing"
import { useState, useEffect } from "react"

const TrackerSvg = () => {
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		setProgress(50)
	}, [])
	return (
		<div className="tracker-section">
			<h2>Mon objectif de consommation</h2>
			<p className="tracker-date">Date - semaine</p>
			<div className="tracker">
				<ProgressRing
					radius={window.innerWidth / 3.2}
					stroke={13}
					progress={progress}
				/>
			</div>
		</div>
	)
}

export default TrackerSvg
