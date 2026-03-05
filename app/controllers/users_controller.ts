import User from '#models/user'
import { createUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
	/**
	 * Create a new user
	 */
	async register({ request, auth }: HttpContext) {
		const data = request.only(['fullName', 'email', 'username', 'password'])
		const payload = await createUserValidator.validate(data)

		try {
			const userCreated = await User.create(payload)
			const user = await User.verifyCredentials(payload.username, payload.password)
			if (userCreated && user) {
				await auth.use('web').login(user)
				return { success: true, user: user }
			} else {
				throw 'Invalid user'
			}
		} catch (error) {
			return { success: false, message: error.code }
		}
	}

	/**
	 * Perform user login
	 */
	async login({ request, response, auth }: HttpContext) {
		const data = request.only(['username', 'password'])
		try {
			const user = await User.verifyCredentials(data.username, data.password)
			if (user) {
				await auth.use('web').login(user)
				return { success: true }
			} else {
				throw 'Invalid credentials'
			}
		} catch (error) {
			response.status(401).send({ error: true, message: error.code })
		}
	}

	async logout({ response, auth }: HttpContext) {
		await auth.use('web').logout()
		return response.redirect('/')
	}
}
