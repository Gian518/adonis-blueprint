import { ConfigProvider } from 'antd'
import { useEffect, useState } from 'react'
import { THEME_COLORS } from '~/utility/constants'
import { setupOneSignal } from '~/utility/onesignal'

const ThemeWrapper: React.FC<{ children: React.ReactNode; oneSignalAppID: string }> = (
	{ children, oneSignalAppID },
) => {
	const [isDarkMode, setIsDarkMode] = useState(false)

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
		setIsDarkMode(mediaQuery.matches)

		const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches)
		mediaQuery.addEventListener('change', handler)

		setupOneSignal(oneSignalAppID)

		return () => mediaQuery.removeEventListener('change', handler)
	}, [])

	return (
		<ConfigProvider
			theme={isDarkMode ? THEME_COLORS.dark : THEME_COLORS.light}
		>
			{children}
		</ConfigProvider>
	)
}

export default ThemeWrapper
