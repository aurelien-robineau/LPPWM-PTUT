import { lazy, Suspense } from "react"
import "./style/main.scss"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { getStorage, onResize } from "./utils/index"
import Loader from "./components/Loader"
import { Provider } from "react-redux"
import { useEffect } from "react"
import store from "./store"
import FinishSignup from "./pages/FinishSignup"
import { useAuth } from "./hooks/auth"
import { storage } from "./utils/constants"
const Login = lazy(() => import("./pages/Login"))
const Signin = lazy(() => import("./pages/Signin"))
const Dashboard = lazy(() => import("./pages/Dashboard"))

// TODO: Manage Routes
// * 404 Page
// * AUto redirect if not connected

const App = () => {
	onResize()
	const themeColor = getStorage(storage.DARK_THEME, localStorage) || false
	const user = useAuth()

	useEffect(() => {
		document.documentElement.dataset.theme = themeColor ? "dark" : "light"
	}, [themeColor])


	console.log(user)
	

	return (
		<Provider store={store}>
			<Router>
				<Suspense fallback={<Loader />}>
					<Switch>
						<Route path="/finish-signup">
						{!!user ? <Redirect to="/dashboard" /> : <FinishSignup />}
						</Route>
						<Route path="/signin">
						{!!user ? <Redirect to="/dashboard" /> :  <Signin />}
						</Route>
						<Route path="/dashboard">
							<Dashboard />
						</Route>
						<Route path="/">
						{!!user ? <Redirect to="/dashboard" /> : <Login />}
						</Route>
					</Switch>
				</Suspense>
			</Router>
		</Provider>
	)
}

export default App
