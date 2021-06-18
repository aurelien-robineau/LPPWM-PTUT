import CardTip from "../CardTips"
// import Hammer from "react-hammerjs"
const ConsumpIdeas = () => {
	const cards = [
		{
			id: 1,
			content:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius expedita incidunt repellendus dolor vel dolorem animi amet dolores.",
		},
		{
			id: 2,
			content:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius expedita incidunt repellendus dolor vel dolorem animi amet dolores.",
		},
		{
			id: 3,
			content:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius expedita incidunt repellendus dolor vel dolorem animi amet dolores.",
		},
		{
			id: 4,
			content:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius expedita incidunt repellendus dolor vel dolorem animi amet dolores.",
		},
	]

	const options = {
		touchAction: "compute",
		recognizers: {
			tap: {
				time: 600,
				threshold: 100,
			},
		},
	}

	return (
		<section className="tips">
			<div className="tips__container">
				<h2>Mes astuces</h2>
				<div className="tips__cards">
					{cards.map(({ content, id }) => (
						// <Hammer
						// 	key={id.toString()}
						// 	onSwipe={() => console.log("swipe")}
						// 	onTap={() => console.log("Click")}
						// >
						<CardTip key={id.toString()} content={content} />
						// </Hammer>
					))}
				</div>
			</div>
		</section>
	)
}

export default ConsumpIdeas
