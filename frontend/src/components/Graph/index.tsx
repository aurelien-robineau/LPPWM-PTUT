import VisualGraph from "./VisualGraph"
import Select from "react-select"
import { useState } from "react"
import { SelectItems } from "./SelectItems"
import { useEffect } from "react"
import { dataUser } from "../../api/methods"

const Graph = () => {
	const [keys, setKeys] = useState<String[]>([])
	const [data, setData] = useState<SelectItems[]>([])
	const [selectedOptions, setSelectedOptions] = useState<SelectItems[]>([])
	const [listMeters, setListMeters] = useState<any>([])

	useEffect(() => {
		;(async () => {
			const response = await dataUser.initGraph()
			const { res, list } = response
			setListMeters(list)
			const listKeys = [...list.map((x: any) => x.id.toString())]
			setData([
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

	// useEffect(() => {
	// 	console.log(selectedOptions)
	// }, [selectedOptions])
	// useEffect(() => {
	// 	if (listMeters.length > 0) {
	// 		const favoriteMeter: number = listMeters.findIndex(
	// 			(x: any) => x.isFavorite
	// 		)
	// 		setSelectedOptions([data[0], listMeters[favoriteMeter].id])
	// 	}
	// 	console.log({ listMeters })
	// }, [listMeters])

	const handleChange = (options: any) => {
		setSelectedOptions((prevState: any) => [...prevState, options])
	}

	return (
		<section className="graph-section">
			<h2>Mon suivi de consommation</h2>
			<div className="graph-wrapper">
				<VisualGraph selected={selectedOptions} />
				<Select
					placeholder="Courbe à afficher"
					closeMenuOnSelect={false}
					onChange={handleChange}
					defaultValue={selectedOptions}
					isMulti
					name="Graphs"
					options={data}
					className="multi-select"
					classNamePrefix="select"
					// defaultMenuIsOpen={true}
				/>
			</div>
		</section>
	)
}

export default Graph
