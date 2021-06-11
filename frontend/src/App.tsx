import React from "react"
import "./style/main.scss"
import BaseButton from "./common/BaseButton"

function App() {
	const handleClick = () => {
		console.log("Test")
	}
	return (
		<div id="app">
			<header>
				<p>On est reeady</p>
				<BaseButton handleClick={handleClick}>Test</BaseButton>
			</header>
		</div>
	)
}

export default App
