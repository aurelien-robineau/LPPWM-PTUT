const IconArrow = ({
	size,
	rotation,
}: {
	size?: number
	rotation?: number
}) => {

	console.log({ size, rotation });

	return (
		<svg
			className={`arrow-${rotation === 90 ? "down" : rotation === 0 ? "flat" : "up"}`}
			width={size || 20}
			height={size || 20}
			viewBox="1 0 20 20"
			fill="currentColor"
			stroke="currentColor"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M19.5197 1.67691C20.366 1.72047 21.0178 2.41072 20.9756 3.21862L20.2876 16.3841C20.2454 17.192 19.5252 17.8116 18.6789 17.7681C17.8326 17.7245 17.1808 17.0343 17.223 16.2264L17.8345 4.52371L5.57579 3.89274C4.7295 3.84918 4.07767 3.15894 4.11989 2.35104C4.16211 1.54314 4.88238 0.923515 5.72867 0.967074L19.5197 1.67691ZM0.970509 17.0553L18.4138 2.0496L20.4727 4.22989L3.02946 19.2356L0.970509 17.0553Z" />
		</svg>
	)
}

export default IconArrow
