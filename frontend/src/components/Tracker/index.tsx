import ProgressRing from "./ProgressRing"

const Tracker = () => {
	let size:number

	if (window.innerWidth < 500) {
		size = window.innerWidth / 3.2;
		console.log("mobile");
		
	} else if (window.innerWidth < 1024) {
		size = window.innerWidth / 6
		console.log("tablet");
	} else {
		size = window.innerWidth / 8
		console.log("desktop");
	}
	console.log({size});
	
return (
	<div className="tracker-section">
		<h2>Mon objectif de consommation</h2>
		<p className="tracker-date">Date - semaine</p>
		<div className="tracker">
			<ProgressRing radius={size} stroke={13} />
		</div>
	</div>
)
}

export default Tracker
