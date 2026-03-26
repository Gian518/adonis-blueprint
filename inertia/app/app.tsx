/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../styles/app.css'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { createInertiaApp } from '@inertiajs/react'
import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { createRoot } from 'react-dom/client'
import ThemeWrapper from '~/components/theme-wrapper'

const appName = import.meta.env.VITE_APP_NAME
const oneSignalAppID = import.meta.env.VITE_ONESIGNAL_APP_ID

declare global {
	interface Window {
		__oneSignalInitialized?: boolean
	}
}

createInertiaApp({
	progress: { color: '#5468FF' },

	title: (title) => `${title} - ${appName}`,

	resolve: (name) => {
		return resolvePageComponent(
			`../pages/${name}.tsx`,
			import.meta.glob('../pages/**/*.tsx'),
		)
	},

	setup({ el, App, props }) {
		createRoot(el).render(
			<ThemeWrapper oneSignalAppID={oneSignalAppID}>
				<Layout>
					<Content>
						<App {...props} />
					</Content>
				</Layout>
			</ThemeWrapper>,
		)
	},
})
