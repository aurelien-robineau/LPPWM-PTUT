import ProgressRing from "./ProgressRing"
import { useState, useEffect } from "react"
import { dataUser } from "../../api/methods"
import { DataTracker } from "./types"

const Tracker = () => {
	const [data, setData] = useState<DataTracker>({
		progress: 0,
		goal: 18,
		consumption: 12,
	})

	useEffect(() => {
		const res = data

		res.progress = 10
		// @ts-ignore
		setData(res)
		// const data: DataTracker = dataUser.initGraph()
		// setData(prevState => ({ prevState, ...res }))
	}, [])

	return (
		<div className="tracker-section">
			<h2>Mon objectif de consommation</h2>
			<p className="tracker-date">Date - semaine</p>
			<div className="tracker">
				<ProgressRing
					radius={window.innerWidth / 3.2}
					stroke={13}
					data={data}
				/>
			</div>
		</div>
	)
}

export default Tracker
