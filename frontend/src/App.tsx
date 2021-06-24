import { lazy, Suspense } from "react"
import "./style/main.scss"
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom"
import { getStorage, onResize } from "./utils/index"
import Loader from "./components/Loader"
import { Provider } from "react-redux"
import { useEffect } from "react"
import store from "./store"
import FinishSignup from "./pages/FinishSignup"
import { useAuth } from "./hooks/auth"
import { storage } from "./utils/constants"
import { auth } from "./api/methods"
import configAxios from "./api/index"
import { useState } from "react"

const Login = lazy(() => import("./pages/Login"))
const Signin = lazy(() => import("./pages/Signin"))
const Dashboard = lazy(() => import("./pages/Dashboard"))

const App = () => {
	const [user] = useAuth()
	const [logged, setLogged] = useState<boolean>(!!user)
	onResize()
	const themeColor = getStorage(storage.DARK_THEME, localStorage) || false

	useEffect(() => {
		setLogged(!!user)
	}, [user])

	useEffect(() => {
		if (user) {
			auth.refreshToken()
			const TOKEN = getStorage(storage.TOKEN, localStorage)
			configAxios.defaults.headers.common[
				"Authorization"
			] = `Bearer ${TOKEN}`
		}
	}, [logged, user])

	useEffect(() => {
		document.documentElement.dataset.theme = themeColor ? "dark" : "light"
	}, [themeColor])

	return (
		<Provider store={store}>
			<Router>
				<Suspense fallback={<Loader />}>
					<Switch>
						<Route path="/finish-signup">
							{!!logged ? (
								<Redirect to="/dashboard" />
							) : (
								<FinishSignup />
							)}
						</Route>
						<Route path="/signin">
							{!!logged ? (
								<Redirect to="/dashboard" />
							) : (
								<Signin />
							)}
						</Route>
						<Route path="/dashboard">
							{logged ? <Dashboard /> : <Redirect to="/" />}
						</Route>
						<Route path="/">
							{!!logged ? (
								<Redirect to="/dashboard" />
							) : (
								<Login />
							)}

						</Route>
					</Switch>
				</Suspense>
			</Router>
		</Provider>
	)
}

export default App
