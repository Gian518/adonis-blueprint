import axios from 'axios'

export const login = async (data: { username: string; password: string }) => {
	try {
		const res = await axios.post('/api/login', data, { withCredentials: true })
		return res.data
	} catch (error) {
		console.error('Error in UsersController.login:', error)
	}
}
