export const onResize = () => {
	document.body.style.setProperty(
		"--vh",
		`${document.documentElement.clientHeight / 100}px`
	)
}
