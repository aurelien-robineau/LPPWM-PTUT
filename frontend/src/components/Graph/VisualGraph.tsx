import { useEffect, useRef, useState } from "react"
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
import { useDarkMode } from "../../hooks/darkTheme"
import { getAllKeys } from "../../utils/index"
import { palette } from "../../utils/palette"

const VisualGraph = () => {
	let blockRef = useRef(null)
	const [darkMode] = useDarkMode()
	const [time, setTime] = useState<string>("day")
	const [data, setData] = useState<
		{ time: string | number; [key: string]: any }[]
	>([
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
	])

	const themeColor: any = darkMode ? palette.dark : palette.light
	const getThemePalette = () => {
		let currentPalette = []
		for (const property in themeColor) {
			currentPalette.push(property)
		}
		return currentPalette.filter(
			color => !/text|white|background|gray|black/gim.test(color)
		)
	}

	const colorPalette = getThemePalette()
	// @ts-ignore
	let keys = getAllKeys(data).filter(x => x !== "time")

	const drawAreas = keys.map((curve, i) => (
		<Area
			key={i.toString()}
			type="monotone"
			dataKey={`${curve}`}
			fillOpacity={4}
			stroke={themeColor[colorPalette[i]]}
			fill={`url(#color${themeColor[colorPalette[i]]})`}
		/>
	))

	const gradients = colorPalette.map((color, i) => (
		<linearGradient
			key={i.toString()}
			id={`color${themeColor[colorPalette[i]]}`}
			x1="0"
			y1="0"
			x2="0"
			y2="1"
		>
			<stop
				offset="5%"
				stopColor={themeColor[colorPalette[i]]}
				stopOpacity={0.8}
			/>
			<stop
				offset="95%"
				stopColor={themeColor[colorPalette[i]]}
				stopOpacity={0}
			/>
		</linearGradient>
	))
	const handleChangeTime = (e: any) => {
		const { offsetParent } = e.target
		console.log(offsetParent.dataset.time)
		setTime(offsetParent.dataset.time)
		const block = offsetParent.dataset.block
		// @ts-ignore
		blockRef.current.style.transform = `translateX(calc(${
			block - 1
		} * (3 * 22vw * .33)))`
	}

	useEffect(() => {}, [data])
	useEffect(() => {
		console.log({ time })
	}, [time])

	return (
		<div className="visual-graph">
			<div className="slider-time">
				<div className="slider-time__container">
					<div className="slider-time__block" ref={blockRef}></div>
					<div
						className="slider-time__item"
						data-time="day"
						data-block="1"
						onClick={handleChangeTime}
					>
						<span>Jour</span>
					</div>
					<div
						className="slider-time__item"
						data-time="week"
						data-block="2"
						onClick={handleChangeTime}
					>
						<span>Semaine</span>
					</div>
					<div
						className="slider-time__item"
						data-time="month"
						data-block="3"
						onClick={handleChangeTime}
					>
						<span>Mois</span>
					</div>
				</div>
			</div>
			<ResponsiveContainer width="100%" height="80%">
				<AreaChart
					data={data}
					margin={{ top: 50, right: 0, left: 0, bottom: 0 }}
				>
					<defs>{gradients}</defs>
					<XAxis
						dataKey="time"
						tickLine={false}
						axisLine={false}
						tickMargin={0}
					/>
					<YAxis
						axisLine={false}
						mirror={true}
						tickLine={false}
						tick={{
							stroke: themeColor.gray,
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
						layout={"horizontal"}
						margin={{ top: 10, left: 0, right: 0, bottom: 0 }}
					/>
					{drawAreas}
				</AreaChart>
			</ResponsiveContainer>
		</div>
	)
}

export default VisualGraph
