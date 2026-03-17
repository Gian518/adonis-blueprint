import User from '#models/user'
import { createUserValidator, passwordChangeValidator, personalDataValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
	/**
	 * Create a new user
	 */
	async register({ request, auth }: HttpContext) {
		const payload = await request.validateUsing(createUserValidator)

		try {
			const userCreated = await User.create({
				fullName: payload.fullName,
				email: payload.email,
				username: payload.username,
				password: payload.password,
			})
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

	/**
	 * Perform a logout
	 */
	async logout({ response, auth }: HttpContext) {
		try {
			await auth.use('web').logout()
			return { success: true }
		} catch (error) {
			response.status(500).send({ error: true, message: error.code })
		}
	}

	/**
	 * Change user personal data
	 */
	async changePersonalData({ request, response, auth }: HttpContext) {
		if (!auth.user) {
			throw 'Invalid user'
		}
		const data = await request.validateUsing(personalDataValidator, { meta: { userId: auth.user.id } })

		try {
			const user = auth.user
			if (!user) {
				throw 'Invalid user'
			}

			user.fullName = data.fullName
			user.username = data.username
			user.email = data.email
			user.save()

			response.status(200).send({ success: true, user })
		} catch (error) {
			response.status(401).send({ error: true, message: error.code })
		}
	}

	async changePassword({ request, response, auth }: HttpContext) {
		if (!auth.user) {
			throw 'Invalid user'
		}
		const data = await request.validateUsing(passwordChangeValidator, { meta: { id: auth.user.id } })

		try {
			const user = auth.user
			if (!user) {
				throw 'Invalid user'
			}
			if (!user.verifyPassword(data.currentPassword)) {
				throw 'Invalid password'
			}

			user.password = data.newPassword
			user.save()
			response.status(200).send({ success: true })
		} catch (error) {
			response.status(403).send({ error: true, message: error.code })
		}
	}
}
