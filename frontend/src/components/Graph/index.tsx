// import { useEffect, useRef } from "react"
import { Line } from "react-chartjs-2"

const options = {
	scales: {
		yAxes: [
			{
				ticks: {
					beginAtZero: true,
				},
			},
		],
	},
}

const Graph = () => {
	// let canvasRef = useRef<any>(null)
	const data = (canvas: any) => {
		const ctx = canvas.getContext("2d")
		const gradient = ctx.createLinearGradient(0, 0, 0, 100)
		gradient.addColorStop(0, "rgba(250,174,50,1)")
		gradient.addColorStop(1, "rgba(250,174,50,0)")

		return {
			labels: ["1", "2", "3", "4", "5", "6"],
			datasets: [
				{
					label: "# of Votes",
					data: [12, 19, 3, 5, 2, 3],
					tension: 0.3,
					fillColor: gradient, // Put the gradient here as a fill color
					strokeColor: "#ff6c23",
					pointColor: "#fff",
					pointStrokeColor: "#ff6c23",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "#ff6c23",
				},
			],
		}
	}

	// useEffect(() => {
	// 	let ctx = canvasRef?.current?.getContext("2d")
	// 	if (ctx) {
	// 		let gradient = ctx.createLinearGradient(0, 0, 0, 400)
	// 		gradient.addColorStop(0, "rgba(250,174,50,1)")
	// 		gradient.addColorStop(1, "rgba(250,174,50,0)")
	// 		// data.datasets[0].fillColor = gradient,
	// 		console.log(data)
	// 	} else {
	// 		console.log("Not load")
	// 	}
	// }, [canvasRef])
	return (
		<section>
			<h2>Ma consommation</h2>
			<Line type={"line"} data={data} options={options} />
			Graph
		</section>
	)
}

export default Graph
