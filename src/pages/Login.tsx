import { useState, useEffect, useRef, SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuthUser, login } from '../services'

const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [usernameActive, setUsernameActive] = useState(false)
	const [usernameError, setUsernameError] = useState(false)
	const [passwordActive, setPasswordActive] = useState(false)
	const [passwordError, setPasswordError] = useState(false)
	const navigate = useNavigate()
	const loginButtonRef = useRef<HTMLButtonElement>(null)

	const setAllError = () => {
		setUsernameError(true)
		setPasswordError(true)
	}

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault()
		loginButtonRef?.current?.blur()
		if (!(username && password)) return setAllError()
		try {
			const data = await login({ username, password })
			if (data?.user) return navigate('/')
			if (data?.error) return setAllError()
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		getAuthUser()
			.then(user => {
				if (user) navigate('/')
			})
			.catch(err => console.error(err))
	}, [navigate])

	return (
		<div className='login'>
			<form onSubmit={handleSubmit}>
				<div className='input'>
					<p
						className={
							usernameError && (usernameActive || username)
								? 'placeholder active invalid'
								: usernameActive || username
								? 'placeholder active'
								: usernameError
								? 'placeholder invalid'
								: 'placeholder'
						}
					>
						Username {usernameError && '*'}
					</p>
					<input
						className={usernameError ? 'invalid' : ''}
						value={username}
						onChange={({ target }) => setUsername(target.value)}
						onFocus={() => {
							setUsernameActive(true)
							setUsernameError(false)
						}}
						onBlur={() => setUsernameActive(false)}
						spellCheck='false'
						type='text'
					/>
				</div>
				<div className='input'>
					<p
						className={
							passwordError && (passwordActive || password)
								? 'placeholder active invalid'
								: passwordActive || password
								? 'placeholder active'
								: passwordError
								? 'placeholder invalid'
								: 'placeholder'
						}
					>
						Password {passwordError && '*'}
					</p>
					<input
						className={passwordError ? 'invalid' : ''}
						value={password}
						onChange={({ target }) => setPassword(target.value)}
						onFocus={() => {
							setPasswordActive(true)
							setPasswordError(false)
						}}
						onBlur={() => setPasswordActive(false)}
						type='password'
					/>
				</div>

				<button ref={loginButtonRef} type='submit' tabIndex={0}>
					Login
				</button>
			</form>
		</div>
	)
}

export default Login
