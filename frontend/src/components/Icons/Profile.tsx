const IconProfile = ({ size = 40 }: { size: number }) => {
	const logoutUser = () => {
		localStorage.clear()
		window.location.reload()
	}

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1"
			strokeLinecap="round"
			strokeLinejoin="round"
			onClick={logoutUser}
		>
			<path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9" />
		</svg>
	)
}

export default IconProfile
