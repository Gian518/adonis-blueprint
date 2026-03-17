import User from '#models/user'

export type ValidationErrors<T> = Array<{
	field: keyof T
	message: string
	rule: string
}>

type TRegisterPayload = {
	fullName: string
	username: string
	email: string
	password: string
	confirmPassword: string
}
export type TRegister = (payload: TRegisterPayload) => Promise<
	{ success: boolean; user?: User; errors?: ValidationErrors<TRegisterPayload> }
>

export type TLogin = (
	payload: { username: string; password: string },
) => Promise<{ success: boolean; message?: string }>

export type TLogout = () => Promise<{ success: boolean; error?: boolean; message?: string }>

type TChangePersonalDataPayload = {
	fullName: string
	username: string
	email: string
}
export type TChangePersonalData = (payload: TChangePersonalDataPayload) => Promise<
	{ success: boolean; user?: User; errors?: ValidationErrors<TChangePersonalDataPayload> }
>

type TChangePasswordPayload = {
	currentPassword: string
	newPassword: string
	confirmPassword: string
}
export type TChangePassword = (
	payload: TChangePasswordPayload,
) => Promise<{ success: boolean; errors?: ValidationErrors<TChangePasswordPayload>; message?: string }>
