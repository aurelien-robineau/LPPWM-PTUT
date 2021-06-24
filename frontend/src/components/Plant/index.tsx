import { Fragment, useEffect, useState } from "react"
import { dataUser } from "../../api/methods"
import Plant0 from "../Plant/plant-0"
import Plant1 from "../Plant/plant-1"
import Plant2 from "../Plant/plant-2"
import Plant3 from "../Plant/plant-3"

const STATE_TEXT_PLANTY = [
	"Planty meurt",
	"Planty est plus petite que la moyenne",
	"Planty est aussi grande que la moyenne",
	"Planty est plus grande que la moyenne",
]

const Plant = () => {
	const [state, setState] = useState<number>(0)
	useEffect(() => {
		;(async () => {
			const state: number = await dataUser.plantyGrowth()
			setState(state)
		})()
	}, [])

	return (
		<div className="plant__container">
			{state === 0 && <Plant0 />}
			{state === 1 && <Plant1 />}
			{state === 2 && <Plant2 />}
			{state === 3 && <Plant3 />}
			<span className="plant__text">{STATE_TEXT_PLANTY[state]}</span>
		</div>
	)
}

export default Plant
