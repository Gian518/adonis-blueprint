import { theme } from 'antd'
import { css } from '~/utility/css'

const button = () => {
	const { useToken } = theme
	const { token } = useToken()

	return {
		ghosted: css({
			backgroundColor: 'transparent',
			borderColor: token.colorBgBase,
			color: token.colorBgBase,
		}),
		danger: css({
			borderColor: token.colorErrorText,
			color: token.colorErrorText,
		}),
	}
}

export default button
