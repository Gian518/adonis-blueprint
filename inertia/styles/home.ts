import { theme } from 'antd'
import { css, cx } from '~/utility/css'
import styles from '.'

const home = () => {
	const { useToken } = theme
	const { token } = useToken()
	const sc = styles.common()

	return {
		welcome: css({
			fontSize: 14,
			lineHeight: '20px',
			color: token.colorTextTertiary,
		}),
		name: css({
			fontSize: 24,
			lineHeight: '32px',
			fontWeight: 'bold',
		}),
		icon: cx(
			sc.defaultIcon,
			css({
				width: 20,
				height: 20,
			}),
		),
		notificationAlert: css({
			marginTop: 10,
		}),
	}
}

export default home
