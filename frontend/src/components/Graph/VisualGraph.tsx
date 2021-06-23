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
import { getThemePalette } from "../../utils/index"
import { useDarkMode } from "../../hooks/darkTheme"
import { getAllKeys } from "../../utils/index"
import { palette } from "../../utils/palette"
import { SelectItems, ValuesGraph } from "./SelectItems"

const VisualGraph = ({
	selected,
	data,
}: {
	selected: SelectItems[]
	data: ValuesGraph[]
}) => {
	let blockRef = useRef<HTMLDivElement>(null)
	const [darkMode] = useDarkMode()
	const themeColor: any = darkMode ? palette.dark : palette.light
	const [time, setTime] = useState<string>("day")
	const filterCurves: string[] = selected.map(x => x.value)
	const colorPalette = getThemePalette(themeColor)
	const [keys, setKeys] = useState<string[]>([])
	useEffect(() => {
		if (data.length > 0) {
			setKeys(getAllKeys(data).filter(x => x !== "time"))
		}
	}, [data])

	const drawAreas = keys.map(
		(curve, i) =>
			filterCurves.includes(curve) && (
				<Area
					key={i.toString()}
					type="monotone"
					dataKey={`${curve}`}
					fillOpacity={4}
					stroke={themeColor[colorPalette[i]]}
					fill={`url(#color${themeColor[colorPalette[i]]})`}
				/>
			)
	)

	const gradients = colorPalette.map((_color, i) => (
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
		setTime(offsetParent.dataset.time)
		const block = offsetParent.dataset.block
		if (null !== blockRef.current) {
			blockRef.current.style.transform = `translateX(calc(${
				block - 1
			} * (3 * ${window.innerWidth < 770 ? "22vw" : "25vw"} + 16px) / 3))`
		}
	}

	return (
		<div className="visual-graph">
			<div className="slider-time">
				<div className="slider-time__container">
					<div className="slider-time__inner-container">
						<div
							className="slider-time__block"
							ref={blockRef}
						></div>
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
