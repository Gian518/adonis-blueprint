import vine from '@vinejs/vine'
import { currentPasswordRule } from '../rules/user.js'

export const createUserValidator = vine.compile(
	vine.object({
		fullName: vine.string(),
		email: vine.string().email().unique({ table: 'users', column: 'email' }),
		username: vine.string().minLength(3).maxLength(50).unique({ table: 'users', column: 'username' }),
		password: vine.string().minLength(8),
		confirmPassword: vine.string().minLength(8).sameAs('password'),
	}),
)

export const personalDataValidator = vine.withMetaData<{ userId: number }>().compile(
	vine.object({
		fullName: vine.string(),
		email: vine.string().email().unique({
			table: 'users',
			column: 'email',
			filter(db, _value, field) {
				db.whereNot('id', field.meta.userId)
			},
		}),
		username: vine.string().minLength(3).maxLength(50).unique({
			table: 'users',
			column: 'username',
			filter(db, _value, field) {
				db.whereNot('id', field.meta.userId)
			},
		}),
	}),
)

export const passwordChangeValidator = vine.withMetaData<{ id: number }>().compile(
	vine.object({
		currentPassword: vine.string().use(currentPasswordRule({ identifierField: 'id' })),
		newPassword: vine.string().minLength(8),
		confirmPassword: vine.string().minLength(8).sameAs('newPassword'),
	}),
)
