import { Typography } from 'antd'
import React from 'react'
import styles from '~/styles'
import { cx } from '~/utility/css'

interface IGlassCard {
	title?: string
	children: React.ReactNode
	containerStyle?: React.CSSProperties
	innerStyle?: React.CSSProperties
}

const GlassCard: React.FC<IGlassCard> = ({ title, children, containerStyle, innerStyle }) => {
	const { innerContainer, heading } = styles.glassCard()

	return (
		<div style={containerStyle}>
			{title && <Typography.Title style={heading}>{title}</Typography.Title>}
			<div style={cx(innerContainer, innerStyle)}>
				{children}
			</div>
		</div>
	)
}

export default GlassCard
