import { endOfWeek, formatDate, startOfWeek } from "../../utils"
import ProgressRing from "./ProgressRing"

const Tracker = () => {
	let size: number
	if (window.innerWidth < 500) {
		size = window.innerWidth / 3.2
	} else if (window.innerWidth < 1024) {
		size = window.innerWidth / 6
	} else {
		size = window.innerWidth / 10
	}

	return (
		<div className="tracker-section">
			<h2 className="desktop-none">Mon objectif de consommation</h2>
			<p className="tracker-date">
				{formatDate(startOfWeek(new Date()))} -{" "}
				{formatDate(endOfWeek(new Date()))}
			</p>
			<div className="tracker">
				<ProgressRing radius={size} stroke={13} />
			</div>
		</div>
	)
}

export default Tracker
