import { useEffect, useState } from "react"

export const useDarkMode = () => {
	const storedDarkMode = localStorage.getItem("DARK_THEME") || false
	const [darkMode, setDarkMode] = useState(storedDarkMode);
	useEffect(() => {
		console.log(`${darkMode} switched`);
	}, [darkMode])

	return [darkMode, setDarkMode]
}