import ProgressRing from "./ProgressRing"
import { useState, useEffect } from "react"

const TrackerSvg = () => {
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		setProgress(50)
	}, [])
	return (
		<div className="tracker">
			<h1>Tracker version SVG</h1>
			<ProgressRing
				radius={window.innerWidth / 4}
				stroke={10}
				progress={progress}
			/>
		</div>
	)
}

export default TrackerSvg
