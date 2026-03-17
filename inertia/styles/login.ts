import { theme } from 'antd'
import { css } from '~/utility/css'

const login = () => {
	const { useToken } = theme
	const { token } = useToken()

	return {
		glassContainer: css({
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			paddingTop: 0,
		}),
		heading: css({
			fontSize: '24px',
			fontWeight: 'bold',
		}),
		subheading: css({
			fontSize: '16px',
			color: token.colorTextTertiary,
		}),
		tabsContainer: css({
			width: '100%',
			display: 'flex',
			marginBottom: 24,
			backgroundColor: token.colorBgBlur,
			borderRadius: 12,
		}),
		tabsButton: css({
			width: '100%',
			margin: 4,
			padding: 10,
			borderRadius: 12,
		}),
		tabsText: css({
			fontSize: 14,
		}),
		form: css({
			width: '100%',
			display: 'flex',
			flexDirection: 'column',
			marginTop: 24,
		}),
		icon: css({
			marginRight: 4,
			color: token.colorTextTertiary,
		}),
		input: css({
			marginTop: 6.5,
			borderRadius: 12,
		}),
		forgotPassword: css({
			alignSelf: 'flex-end',
			marginTop: 16,
			padding: 0,
			color: token.colorTextTertiary,
		}),
		loginButton: css({
			marginTop: 32,
			marginBottom: 48,
		}),
	}
}

export default login
