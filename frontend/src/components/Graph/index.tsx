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
	const [selectedOptions, setSelectedOptions] = useState([data[0], data[1]])

	const handleChange = (options: any) => {
		setSelectedOptions(options)
	}

	return (
		<section className="graph-section">
			<h2>Ma consommation</h2>
			<Select
				placeholder="Courbe à afficher"
				closeMenuOnSelect={false}
				onChange={handleChange}
				defaultValue={selectedOptions}
				isMulti
				name="Graphs"
				options={data}
				className="basic-multi-select"
				classNamePrefix="select"
			/>
			<VisualGraph selected={selectedOptions} />
		</section>
	)
}

export default Graph
