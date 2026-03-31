import { ColProps } from 'antd'

const grid = () => {
	return {
		col: {
			xs: 24,
			md: { span: 12, offset: 6 },
		} as ColProps,
	}
}

export default grid
