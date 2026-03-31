import { theme } from 'antd'
import { vss } from '~/utility/css'

const onesignalalert = () => {
	const { useToken } = theme
	const { token } = useToken()

	return {
		notificationCloseButton: vss({
			marginRight: 5,
		}, {
			alertType: {
				info: {
					backgroundColor: token.colorInfo,
				},
				warning: {
					backgroundColor: token.colorWarning,
				},
				error: {
					backgroundColor: token.colorError,
				},
				success: {
					backgroundColor: token.colorPrimary,
				},
			},
		}),
	}
}

export default onesignalalert
