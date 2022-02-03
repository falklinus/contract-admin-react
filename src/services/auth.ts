import Api from './api'

export const getAuthUser = async () => {
	try {
		return (await Api().get('/user')).data
	} catch (err: any) {
		console.error(err?.response?.data?.error)
		return null
	}
}

export const login = async (user: { username: string; password: string }) => {
	try {
		const data = (await Api().post('/user/login', user)).data
		localStorage.setItem('user', JSON.stringify(data))
		return data
	} catch (err: any) {
		return { error: err?.response.data?.error || null }
	}
}
