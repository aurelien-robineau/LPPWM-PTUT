const IconProfile = ({ size = 40 }: { size: number }) => {
	const logoutUser = () => {
		localStorage.clear()
		window.location.reload()
	}

	return (
		<svg width={size} height={size} viewBox="0 0 40 40" fill="currentColor">
			<path d="M20 40C23.9556 40 27.8224 38.827 31.1114 36.6294C34.4004 34.4318 36.9638 31.3082 38.4776 27.6537C39.9913 23.9991 40.3874 19.9778 39.6157 16.0982C38.844 12.2186 36.9392 8.65492 34.1421 5.85787C31.3451 3.06082 27.7814 1.15601 23.9018 0.384303C20.0222 -0.387401 16.0009 0.00866567 12.3463 1.52242C8.69181 3.03617 5.56823 5.59962 3.37061 8.8886C1.17298 12.1776 0 16.0444 0 20C0.00588189 25.3025 2.11491 30.3862 5.86436 34.1356C9.61381 37.8851 14.6975 39.9941 20 40ZM20 38.2978C16.1705 38.301 12.4377 37.0956 9.33333 34.8533C9.3509 34.7851 9.35986 34.7149 9.36 34.6444C9.4169 31.8608 10.5627 29.2103 12.5514 27.2618C14.5402 25.3133 17.2135 24.2219 19.9978 24.2219C22.782 24.2219 25.4553 25.3133 27.4441 27.2618C29.4329 29.2103 30.5786 31.8608 30.6355 34.6444C30.6357 34.7149 30.6446 34.7851 30.6622 34.8533C27.5591 37.0947 23.8279 38.3001 20 38.2978ZM14.8533 17.1556C14.8524 16.1364 15.1539 15.1399 15.7196 14.2921C16.2853 13.4443 17.0897 12.7834 18.0311 12.393C18.9726 12.0025 20.0086 11.9002 21.0083 12.0988C22.0079 12.2974 22.9262 12.7881 23.6468 13.5087C24.3675 14.2294 24.8582 15.1476 25.0568 16.1473C25.2554 17.1469 25.153 18.183 24.7626 19.1244C24.3722 20.0658 23.7112 20.8703 22.8635 21.436C22.0157 22.0016 21.0192 22.3031 20 22.3022C18.6357 22.2999 17.328 21.7569 16.3633 20.7922C15.3987 19.8275 14.8557 18.5198 14.8533 17.1556ZM20 1.70223C23.6952 1.69987 27.3045 2.81694 30.3524 4.90627C33.4003 6.9956 35.7437 9.95919 37.0741 13.4066C38.4045 16.8541 38.6594 20.6237 37.8052 24.2188C36.951 27.814 35.0278 31.0661 32.2889 33.5467C32.0701 31.1256 31.1428 28.8226 29.6228 26.9256C28.1027 25.0285 26.0574 23.6213 23.7422 22.88C24.9782 22.0736 25.9207 20.8896 26.4293 19.5043C26.9379 18.1189 26.9854 16.6064 26.5648 15.1918C26.1442 13.7773 25.2779 12.5364 24.095 11.654C22.912 10.7717 21.4758 10.295 20 10.295C18.5242 10.295 17.0879 10.7717 15.905 11.654C14.7221 12.5364 13.8558 13.7773 13.4352 15.1918C13.0146 16.6064 13.0621 18.1189 13.5707 19.5043C14.0793 20.8896 15.0218 22.0736 16.2578 22.88C13.9426 23.6213 11.8973 25.0285 10.3772 26.9256C8.85718 28.8226 7.92986 31.1256 7.71111 33.5467C4.97223 31.0661 3.04901 27.814 2.1948 24.2188C1.3406 20.6237 1.59547 16.8541 2.92586 13.4066C4.25624 9.95919 6.59972 6.9956 9.64759 4.90627C12.6955 2.81694 16.3048 1.69987 20 1.70223Z" />
		</svg>
	)
}

export default IconProfile
