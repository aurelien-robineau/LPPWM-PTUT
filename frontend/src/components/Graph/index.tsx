import VisualGraph from "./VisualGraph"
import Select from "react-select"

const options = [
	{ value: "chocolate", label: "Chocolate" },
	{ value: "strawberry", label: "Strawberry" },
	{ value: "vanilla", label: "Vanilla" },
]

// TODO Style of select Element: https://react-select.com/styles
const Graph = () => {
	const keys = ["uv", "pv", "amt"]

	const data = keys.map(x => ({
		value: x,
		label: `${x.charAt(0).toUpperCase()}${x.slice(1)}`,
	}))

	return (
		<section className="graph-section">
			<h2>Ma consommation</h2>
			<Select
				defaultValue={[data[0], data[2]]}
				isMulti
				name="Graphs"
				options={data}
				className="basic-multi-select"
				classNamePrefix="select"
			/>
			<VisualGraph />
		</section>
	)
}

export default Graph
