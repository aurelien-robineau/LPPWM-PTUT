import React from "react"

const BaseButton = (props: any) => {
	const { children, handleClick } = props
	return <button onClick={handleClick}>{children}</button>
}

export default BaseButton
