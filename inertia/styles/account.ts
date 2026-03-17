import { theme } from 'antd'
import { css, vss } from '~/utility/css'

const account = () => {
	const { useToken } = theme
	const { token } = useToken()

	return {
		pageTitle: css({
			fontSize: 20,
			fontWeight: 'bold',
		}),
		editButton: vss({
			color: token.Button?.textTextColor,
		}, {
			editing: {
				true: {
					color: token.colorPrimary,
					backgroundColor: token.colorBgBase,
				},
			},
		}),
		avatar: css({
			marginTop: 32,
			padding: 3,
			backgroundColor: token.colorBgBase,
			border: `2px solid ${token.colorPrimary}`,
		}),
		icon: css({
			color: token.colorPrimary,
			backgroundColor: token.colorBgBase,
		}),
		fullName: css({
			marginTop: 16,
			marginBottom: 0,
			fontSize: 24,
			fontWeight: 'bold',
		}),
		username: css({
			fontSize: 16,
			color: token.colorTextTertiary,
		}),
		sectionTitle: css({
			marginTop: 16,
			color: token.colorPrimary,
			fontWeight: 600,
		}),
		input: vss({
			marginTop: 4.5,
			borderColor: '#FFFFFF0A',
		}, {
			disabled: {
				true: {
					color: '#ffffffa5',
				},
			},
		}),
		inputIcon: vss({
			marginRight: 4,
		}, {
			disabled: {
				true: {
					color: '#ffffffa5',
				},
			},
		}),
		saveButton: css({
			width: '100%',
			marginTop: 16,
		}),
	}
}

export default account
