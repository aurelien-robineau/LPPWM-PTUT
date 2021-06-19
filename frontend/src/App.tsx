import { lazy, Suspense } from "react"
import "./style/main.scss"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { onResize } from "./utils"
import Loader from "./components/Loader"
import { Provider } from "react-redux"
// import { useAuth } from "./hooks/auth"
import { useEffect } from "react"
import store from "./store"
import FinishSignup from "./pages/FinishSignup"
const Login = lazy(() => import("./pages/Login"))
const Signin = lazy(() => import("./pages/Signin"))
const Dashboard = lazy(() => import("./pages/Dashboard"))

// TODO: Manage Routes
// * 404 Page
// * AUto redirect if not connected

const App = () => {
	// const [logged] = useAuth()
	const themeColor = JSON.parse(localStorage.getItem("DARK_THEME") || "false")

	useEffect(() => {
		document.documentElement.dataset.theme = themeColor ? "dark" : "light"
	}, [themeColor])
	// console.log({ logged })
	onResize()

	return (
		<Provider store={store}>
			<Router>
				<Suspense fallback={<Loader />}>
					<Switch>
						<Route path="/finish-signup">
							<FinishSignup />
						</Route>
						<Route path="/signin">
							<Signin />
						</Route>
						<Route path="/dashboard">
							<Dashboard />
						</Route>
						<Route path="/">
							<Login />
						</Route>
					</Switch>
				</Suspense>
			</Router>
		</Provider>
	)
}

export default App
