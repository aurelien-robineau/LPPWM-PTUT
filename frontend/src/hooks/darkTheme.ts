import { useEffect, useState } from "react";

function getPrefColorScheme() {
	if (!window.matchMedia) return;
	console.log(window.matchMedia("(prefers-color-scheme: dark)").matches);

	return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function getSavedMode() {
	const isReturningUser = "DARK_THEME" in localStorage;
	const savedMode = JSON.parse(localStorage.getItem("DARK_THEME") || "false");

	if (isReturningUser) {
		return savedMode;
	}
	return getPrefColorScheme();
}

export function useDarkMode() {
	const [darkMode, setDarkMode] = useState(getSavedMode());

	useEffect(() => {
		localStorage.setItem("DARK_THEME", JSON.stringify(darkMode));
		if (darkMode) {
			document.documentElement.dataset.theme = "dark";
		} else {
			document.documentElement.dataset.theme = "light";
		}
	}, [darkMode]);

	return [darkMode, setDarkMode];
}