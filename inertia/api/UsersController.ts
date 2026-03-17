import axios from 'axios'
import { TChangePassword, TChangePersonalData, TRegister } from '~/models/api'
import { statics } from '~/utility/snacks'

const { apiError } = statics

export const login = async (data: { username: string; password: string }) => {
	try {
		const res = await axios.post('/api/login', data, { withCredentials: true })
		return res.data
	} catch (error) {
		console.error('Error in UsersController.login:', error)
	}
}

export const register: TRegister = async (
	data,
) => {
	try {
		const res = await axios.post('/api/register', data, { withCredentials: true })
		return res.data
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			return error.response.data
		}
		console.error('Error in UsersController.register:', error)
	}
}

export const logout = async () => {
	try {
		const res = await axios.post('/api/logout', {}, { withCredentials: true })
		return res.data
	} catch (error) {
		console.error('Error in UsersController.logout:', error)
	}
}

export const changePersonalData: TChangePersonalData = async (data) => {
	try {
		const res = await axios.post('/api/change-personal-data', data, { withCredentials: true })
		return res.data
	} catch (error) {
		console.error('Error in UsersController.changePersonalData:', error)
		return apiError(error)
	}
}

export const changePassword: TChangePassword = async (data) => {
	try {
		const res = await axios.post('/api/change-password', data, { withCredentials: true })
		return res.data
	} catch (error) {
		console.error('Error in UsersController.changePassword:', error)
		return apiError(error)
	}
}
