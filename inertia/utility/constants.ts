import { ThemeConfig } from 'antd'

const BASE_TOKENS: NonNullable<ThemeConfig['token']> = {
	fontFamily: 'Inter, sans-serif',
	colorPrimary: '#13EC5B',
	colorBgBase: '#E8FCEC',
	colorBgLayout: 'transparent',
	colorBgBlur: '#FFFFFF3C',
	colorText: '#1E293B',
	colorTextSecondary: '#666666',
	colorTextTertiary: '#64748B',
	colorTextPlaceholder: '#7d7d7d',
	colorBorder: '#FFFFFF05',
	colorBgContainer: '#FFFFFF',
}

const BASE_BUTTON_STYLES: NonNullable<ThemeConfig['components']>['Button'] = {
	primaryShadow: 'none',
	borderRadius: 8,
	colorBorderDisabled: '#1f1f1f63',
	colorBgContainerDisabled: '#0495355b',
	colorText: '#09813197',
	colorTextDisabled: '#1f1f1f63',
}

const BASE_INPUT_STYLES: NonNullable<ThemeConfig['components']>['Input'] = {
	paddingBlock: 16,
	paddingInline: 14,
	fontSize: 14,
	colorFillSecondary: '#FFFFFF44',
	colorFillTertiary: '#FFFFFF33',
	colorErrorBg: '#531a1a8d',
	colorErrorBgHover: '#FFFFFF33',
	colorBgContainerDisabled: '#00000033',
}

export const THEME_COLORS: {
	light: ThemeConfig
	dark: ThemeConfig
} = {
	light: {
		token: {
			...BASE_TOKENS,
		},
		components: {
			Button: {
				...BASE_BUTTON_STYLES,
			},
			Input: {
				...BASE_INPUT_STYLES,
			},
		},
	},
	dark: {
		token: {
			...BASE_TOKENS,
			colorPrimary: '#13EC5B',
			colorBgBase: '#162B18',
			colorBgLayout: 'transparent',
			colorBgBlur: '#FFFFFF0D',
			colorText: '#F5F5F5',
			colorTextSecondary: '#A0A0A0',
			colorTextTertiary: '#94A3B8',
			colorTextPlaceholder: '#64748B',
			colorBorder: '#333333',
			colorBgContainer: '#1A1A1A',
			colorErrorText: '#b80d10',
		},
		components: {
			Button: {
				...BASE_BUTTON_STYLES,
				primaryColor: '#152117',
				colorBorderDisabled: '#01190997',
				colorBgContainerDisabled: '#0119095b',
				colorTextDisabled: '#01190997',
			},
			Input: {
				...BASE_INPUT_STYLES,
				colorFillSecondary: '#00000044',
				colorFillTertiary: '#00000033',
				colorErrorBgHover: '#00000033',
				colorErrorBg: '#410a0a3a',
				colorBgContainerDisabled: '#FFFFFF11',
			},
		},
	},
}
