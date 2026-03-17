import { theme } from 'antd'
import { css } from '~/utility/css'

const glassCard = () => {
	const { useToken } = theme
	const { token } = useToken()

	return {
		innerContainer: css({
			backdropFilter: 'blur(10px)',
			backgroundColor: token.colorBgBlur,
			border: '1px solid rgba(255, 255, 255, 0.1)',
			borderRadius: '16px',
			padding: { base: '16px 24px', xl: '16px 174px' },
		}),
		heading: css({
			marginLeft: 12,
			marginBottom: 8,
			fontSize: 14,
			fontWeight: 600,
			textTransform: 'uppercase',
			color: token.colorTextTertiary,
		}),
	}
}

export default glassCard
