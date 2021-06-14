import React, { lazy, Suspense } from "react"
import "./style/main.scss"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { onResize } from "./utils"
import Loader from "./components/Loader"
import { useAuth } from "./hooks/auth"
const Login = lazy(() => import("./pages/Login"))
const Signin = lazy(() => import("./pages/Signin"))
const Dashboard = lazy(() => import("./pages/Dashboard"))

const App = () => {
	const [logged, setLogged] = useAuth()

	console.log(logged)

	onResize()
	return (
		<Router>
			<Suspense fallback={<Loader />}>
				<Switch>
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
	)
}

export default App
