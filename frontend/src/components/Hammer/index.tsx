import Hammer from "hammerjs"
import { useEffect, useRef } from "react"

const HammerEl = (props: any) => {
	const { children } = props
	let el = useRef(null)
	useEffect(() => {
		if (el) {
			// @ts-ignore
			const manager = new Hammer.Manager(el)
			const swipe = new Hammer.Swipe()
			manager.add(swipe)
			let deltaX = 0
			let deltaY = 0

			// Subscribe to a desired event
			manager.on("swipe", e => {
				deltaX = deltaX + e.deltaX
				let direction = e.offsetDirection
				let translate3d = "translate3d(" + deltaX + "px, 0, 0)"

				if (direction === 4 || direction === 2) {
					// @ts-ignore
					e.target.textContent = deltaX
					e.target.style.transform = translate3d
				}
			})
		}
	}, [el])

	return <div ref={el}>{children}</div>
}

export default HammerEl
