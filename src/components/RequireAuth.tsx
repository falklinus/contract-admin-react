import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { getAuthUser } from '../services'

const RequireAuth = ({ children }: { children: JSX.Element }) => {
	const [render, setRender] = useState<any>()

	useEffect(() => {
		getAuthUser()
			.then(user => {
				if (user) return setRender(children)
				setRender(<Navigate to='/login' />)
			})
			.catch(err => console.error(err))
	}, [children])

	return render || null
}

export default RequireAuth
