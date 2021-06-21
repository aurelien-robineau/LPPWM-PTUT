import CardTip from "../CardTips"
import { useDrag } from "react-use-gesture"
import { useSprings, animated, to as interpolate } from "react-spring"
import { useState } from "react"
// import HammerEl from "../Hammer"

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
const to = (i: number) => ({
	x: 0,
	y: i * -4,
	scale: 1,
	rot: -10 + Math.random() * 20,
	delay: i * 100,
})
const from = () => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r: number, s: any) => `scale(${s} *.8)`

const ConsumpIdeas = () => {
	const [gone] = useState(() => new Set())
	const [props, set] = useSprings(cards.length, i => ({
		...to(i),
		from: from(),
	}))

	const bind = useDrag(
		({
			args: [index],
			down,
			movement: [mx],
			direction: [xDir],
			velocity,
		}) => {
			const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
			const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
			if (!down && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
			set(i => {
				if (index !== i) return // We're only interested in changing spring-data for the current spring
				const isGone = gone.has(index)
				const x = isGone
					? (200 + window.innerWidth) * dir
					: down
					? mx
					: 0 // When a card is gone it flys out left or right, otherwise goes back to zero
				const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
				const scale = down ? 1.1 : 1 // Active cards lift up a bit
				return {
					x,
					rot,
					scale,
					delay: undefined,
					config: {
						friction: 50,
						tension: down ? 800 : isGone ? 200 : 500,
					},
				}
			})
			if (!down && gone.size === cards.length)
				// @ts-ignore
				setTimeout(() => gone.clear() || set(i => to(i)), 600)
		}
	)

	return (
		<section className="tips">
			<div className="tips__container">
				<h2>Mes astuces</h2>
				<div className="tips__cards">
					{props.map(({ x, y, rot, scale }, i) => (
						<animated.div key={i} style={{ x, y }}>
							<animated.div
								{...bind(i)}
								style={{
									transform: interpolate([rot, scale], trans),
								}}
							>
								<CardTip content={cards[i].content} />
							</animated.div>
						</animated.div>
					))}
				</div>
			</div>
		</section>
	)
}

export default ConsumpIdeas
