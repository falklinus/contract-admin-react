import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Styles
import './App.scss'

// Pages
import Login from './pages/Login'
import Home from './pages/Home'

// Components
import RequireAuth from './components/RequireAuth'

const App = () => {
	return (
		<div className='App'>
			<Router>
				<Routes>
					<Route
						path='/'
						element={
							<RequireAuth>
								<Home />
							</RequireAuth>
						}
					/>
					<Route path='/login' element={<Login />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App
