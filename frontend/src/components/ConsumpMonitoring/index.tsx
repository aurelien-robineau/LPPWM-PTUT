import { parse } from "path"
import { useState } from "react"
import { useEffect } from "react"
import { dataUser } from "../../api/methods"
import Plant from "../Plant"
import CardMonitoring from "./Card"

const ConsumpMonitoring = () => {
	const [data, setData] = useState<any>({})
	useEffect(() => {
		const fetchData = async () => {
			const res = await dataUser.comparisonConsumption()
			setData(res)
		}
		fetchData()
	}, [])

	return (
		<>
			<div className="card-container-day">
				<CardMonitoring
					timeScale={"day"}
					variation={{
						trend: data?.DAY?.trend || 0,
						value: parseFloat((data?.DAY?.value / 1000).toFixed(1)) || 0,
					}}
					iconSize={12}
				/>
			</div>

			<div className="plant">
				<Plant />
			</div>

			<div className="card-container-week-month">
				<CardMonitoring
					timeScale={"week"}
					variation={{
						trend: data?.WEEK?.trend || 0,
						value: Math.floor(data?.WEEK?.value / 1000) || 0,
					}}
					iconSize={14}
				/>

				<CardMonitoring
					timeScale={"month"}
					variation={{
						trend: data?.MONTH?.trend || 0,
						value: Math.floor(data?.MONTH?.value / 1000) || 0,
					}}
					iconSize={14}
				/>
			</div>
		</>
	)
}

export default ConsumpMonitoring
