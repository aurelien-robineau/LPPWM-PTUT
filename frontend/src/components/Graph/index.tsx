import VisualGraph from "./VisualGraph"
import Select from "react-select"
import { useState } from "react"
import { SelectItems } from "./SelectItems"

// TODO Style of select Element: https://react-select.com/styles
const Graph = () => {
	const keys = ["uv", "pv", "amt"]

	const data: SelectItems[] = keys.map(x => ({
		value: x,
		label: `${x.charAt(0).toUpperCase()}${x.slice(1)}`,
	}))
	const [selectedOptions, setSelectedOptions] = useState<SelectItems[]>([
		data[0],
		data[1],
	])

	const handleChange = (options: any) => {
		setSelectedOptions(options)
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
				//defaultMenuIsOpen={true}
			/>
			</div>
		</section>
	)
}

export default Graph
