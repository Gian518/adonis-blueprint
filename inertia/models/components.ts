import User from '#models/user'
import React from 'react'

interface BaseComponent {
	/** Object with default translations (English) */
	fallbackTranslations: Record<string, string>
	/** The current locale in ISO 3166-1 alpha-2 format */
	locale: string
	/** Labels translated in the current navigation language */
	localeTranslations: Record<string, string>
	/** Current user data */
	user: User
}

type ComponentProps<T extends Record<string, any> = {}> = BaseComponent & T
export type RC<T extends Record<string, any> = {}> = React.FC<ComponentProps<T>>
