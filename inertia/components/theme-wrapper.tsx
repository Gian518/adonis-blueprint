import { ConfigProvider } from 'antd'
import { useEffect, useState } from 'react'
import { THEME_COLORS } from '~/utility/constants'

const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isDarkMode, setIsDarkMode] = useState(false)

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
		setIsDarkMode(mediaQuery.matches)

		const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches)
		mediaQuery.addEventListener('change', handler)

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
