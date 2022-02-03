import axios from 'axios'

let baseURL: string = 'https://contract-admin-app.herokuapp.com/'

if (process.env.NODE_ENV === 'development') baseURL = 'http://localhost:8081/'

const Api = () => {
	const Api = axios.create({
		baseURL,
	})
	const user = JSON.parse(localStorage.getItem('user') as string)
	if (user && user.token)
		Api.defaults.headers.common['authorization'] = `Bearer ${user.token}`

	return Api
}

export default Api
