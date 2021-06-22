import ProgressRing from "./ProgressRing"
import { useState, useEffect } from "react"
import { dataUser } from "../../api/methods"
import { DataTracker } from "./types"

const Tracker = () => {
	return (
		<div className="tracker-section">
			<h2>Mon objectif de consommation</h2>
			<p className="tracker-date">Date - semaine</p>
			<div className="tracker">
				<ProgressRing radius={window.innerWidth / 3.2} stroke={13} />
			</div>
		</div>
	)
}

export default Tracker
