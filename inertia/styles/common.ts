import { css } from '~/utility/css'

const common = () => {
	return {
		container: css({
			width: '100%',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			padding: '24px 16px',
		}),
		standardFlex: css({
			display: 'flex',
			flexDirection: 'column',
		}),

		// Width/Height
		w100: css({
			width: '100%',
		}),
		h100: css({
			height: '100%',
		}),

		// Margins
		mt16: css({
			marginTop: 16,
		}),
		mt32: css({
			marginTop: 32,
		}),
		mb16: css({
			marginBottom: 16,
		}),
		mb32: css({
			marginBottom: 32,
		}),
	}
}

export default common
