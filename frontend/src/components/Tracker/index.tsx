import React from "react"
import { PieChart, Pie, Sector, Cell } from "recharts";


// const Tracker = () => {
// 	return (

// 		<div className="tracker-section">

// 			<h2>Mon objectif de consommation</h2>

// 		</div>
// 	)
// }

// export default Tracker


const data = [{ name: "Group A", value: 20 },
{ name: "Group B", value: 80 },];


const COLORS = ["green", "transparent"];


const Tracker = () => {
	return (

		<div className="tracker-section">

			<h2>Mon objectif de consommation</h2>

			<PieChart width={375} height={300}>
				<Pie
					data={data}
					cx={100}
					cy={100}
					innerRadius={60}
					outerRadius={80}
					fill="none"
					stroke="none"
					paddingAngle={0}
					startAngle={90}
					endAngle={450}
					dataKey="value"
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>

			</PieChart>


		</div>
	)
}

export default Tracker
