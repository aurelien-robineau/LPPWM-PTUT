import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	Legend,
} from "recharts"
import { palette } from "../../utils/palette"

const data = [
	{
		time: "Lun",
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		time: "Mar",
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
	{
		time: "Mer",
		uv: 2000,
		pv: 9800,
		amt: 2290,
	},
	{
		time: "Jeu",
		uv: 2780,
		pv: 3908,
		amt: 2000,
	},
	{
		time: "Ven",
		uv: 1890,
		pv: 4800,
		amt: 2181,
	},
	{
		time: "Sam",
		uv: 2390,
		pv: 3800,
		amt: 2500,
	},
	{
		time: "Dim",
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
]

const VisualGraph = () => {
	return (
		<div className="visual-graph">
			<ResponsiveContainer height="80%">
				<AreaChart
					data={data}
					margin={{ top: 50, right: 0, left: 0, bottom: 0 }}
				>
					<defs>
						<linearGradient
							id="colorUv"
							x1="0"
							y1="0"
							x2="0"
							y2="1"
						>
							<stop
								offset="5%"
								stopColor={palette.light.primary}
								stopOpacity={0.8}
							/>
							<stop
								offset="95%"
								stopColor={palette.light.primary}
								stopOpacity={0}
							/>
						</linearGradient>
						<linearGradient
							id="colorPv"
							x1="0"
							y1="0"
							x2="0"
							y2="1"
						>
							<stop
								offset="5%"
								stopColor={palette.light.secondary}
								stopOpacity={0.8}
							/>
							<stop
								offset="95%"
								stopColor={palette.light.secondary}
								stopOpacity={0}
							/>
						</linearGradient>
					</defs>
					<XAxis
						dataKey="time"
						tickLine={false}
						axisLine={false}
						tickMargin={5}
					/>
					<YAxis
						axisLine={false}
						mirror={true}
						tickLine={false}
						tick={{
							stroke: palette.light.gray,
							strokeWidth: 0,
						}}
						label={{ value: "kW", position: "top", marginTop: 10 }}
						type="number"
						height={5}
						tickCount={5}
						tickMargin={5}
						minTickGap={10}
					/>
					<CartesianGrid strokeDasharray="10" vertical={false} />
					<Tooltip />
					<Legend
						verticalAlign="bottom"
						height={20}
						iconType={"circle"}
						align={"center"}
						layout={"vertical"}
						margin={{ top: 10, left: 0, right: 0, bottom: 0 }}
					/>
					<Area
						type="monotone"
						dataKey="uv"
						stroke={palette.light.primary}
						fillOpacity={4}
						fill="url(#colorUv)"
					/>
					<Area
						type="monotone"
						dataKey="pv"
						stroke={palette.light.secondary}
						fillOpacity={4}
						fill="url(#colorPv)"
					/>
					<Area
						type="monotone"
						dataKey="amt"
						stroke={palette.light.tertiary}
						fillOpacity={4}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	)
}

export default VisualGraph
