import { Line } from "react-chartjs-2"

const data = {
	labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
	datasets: [
		{
			label: "# of Votes",
			data: [12, 15, 3, 5, 2, 3, 7, 9, 12, 8, 15],
			fill: true,
			tension: 0.35,
			backgroundColor: "rgba(255, 99, 132, .5)",
			borderColor: "rgba(255, 99, 132, 0.2)",
		},
	],
}

const options = {
	scales: {
		yAxes: [
			{
				ticks: {
					beginAtZero: true,
					minor: {
						fontColor: "green",
					},
					major: {
						fontColor: "red",
					},
				},
			},
		],
		xAxes: [
			{
				ticks: {
					beginAtZero: true,
				},
			},
		],
	},

	plugins: {
		tooltip: {
			backgroundColor: "red",
			titleAlign: "center",
			titleFont: {
				size: 16,
				family: "Quasimoda",
				style: "oblique",
			},
		},
	},
}

const Graph = () => {
	return (
		<section>
			<h2>Ma consommation</h2>
			<Line type={"line"} data={data} options={options} />
			Graph
		</section>
	)
}

export default Graph
