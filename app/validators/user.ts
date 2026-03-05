import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
	vine.object({
		fullName: vine.string(),
		email: vine.string().email(),
		username: vine.string().minLength(3).maxLength(50),
		password: vine.string().minLength(8),
	}),
)
