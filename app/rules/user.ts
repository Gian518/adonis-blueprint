import User from '#models/user'
import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

interface Options {
	identifierField: string
}

const currentPassword = async (
	value: unknown,
	options: Options,
	field: FieldContext,
) => {
	if (typeof value !== 'string') return
	if (!field.isValid) return

	const data = field.meta as any
	const identifier = data[options.identifierField]
	if (!identifier) return

	const user = await User.findBy(options.identifierField, identifier)
	if (!user || !await user.verifyPassword(value)) {
		field.report('currentPassword mismatch', 'passwordMismatch', field)
	}
}

export const currentPasswordRule = vine.createRule(currentPassword, { isAsync: true })
