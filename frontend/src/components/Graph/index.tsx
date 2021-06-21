import VisualGraph from "./VisualGraph"
import Select from "react-select"
import { useState } from "react"

// TODO Style of select Element: https://react-select.com/styles
const Graph = () => {
	const keys = ["uv", "pv", "amt"]

	const data = keys.map(x => ({
		value: x,
		label: `${x.charAt(0).toUpperCase()}${x.slice(1)}`,
	}))
	const [selectedOptions, setSelectedOptions] = useState([data[0], data[2]])

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
			{selectedOptions.map((o: any) => (
				<p>{o.value}</p>
			))}
			<VisualGraph selected={selectedOptions} />
		</section>
	)
}

export default Graph
