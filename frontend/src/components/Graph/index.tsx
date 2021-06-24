import VisualGraph from "./VisualGraph"
import Select from "react-select"
import { useState } from "react"
import { SelectItems, ValuesGraph } from "./SelectItems"
import { useEffect } from "react"
import { dataUser } from "../../api/methods"

const Graph = () => {
	const [time, setTime] = useState<string>("DAY")
	const [data, setData] = useState<ValuesGraph[]>([])
	const [listSelect, setListSelect] = useState<SelectItems[]>([])
	const [selectedOptions, setSelectedOptions] = useState<SelectItems[]>([])

	const updateTimeGraph = (newScale: string) => {
		setTime(newScale)
	}
	useEffect(() => {
		;(async () => {
			console.log("useEffect")

			const response = await dataUser.initGraph()
			const { res, list } = response

			setData(
				res.map((x: any) => {
					const d: Date = new Date(x.time)
					x.time = new Intl.DateTimeFormat("fr", {
						hour: "numeric",
						minute: "numeric",
						hourCycle: "h24",
						day: "2-digit",
						month: "2-digit",
					}).format(d)
					return x
				})
			)
			const listKeys = [...list.map((x: any) => x.id.toString())]
			setListSelect([
				{
					value: "average",
					label: "Moyenne des foyers similare de la région",
				},
				...listKeys.map((x: any, index: any) => ({
					value: x,
					label: `${list[index].street}`,
				})),
			])
		})()
	}, [])

	useEffect(() => {
		if (listSelect.length >= 2) {
			setSelectedOptions([listSelect[0], listSelect[1]])
		}
	}, [listSelect])

	useEffect(() => {
		const fetchData = async () => {
			const res = await dataUser.graph(time)
			setData(res)
		}
		fetchData()
	}, [time])

	const handleChange = (options: any) => {
		setSelectedOptions(options)
	}

	return (
		<section className="graph-section">
			<h2>Mon suivi de consommation</h2>
			<div className="graph-wrapper">
				<VisualGraph
					selected={selectedOptions}
					data={data}
					updateTime={updateTimeGraph}
				/>
				<Select
					placeholder="Courbe à afficher"
					closeMenuOnSelect={false}
					onChange={handleChange}
					defaultValue={selectedOptions}
					isMulti
					name="Graphs"
					options={listSelect}
					className="multi-select"
					classNamePrefix="select"
				/>
			</div>
		</section>
	)
}

export default Graph
