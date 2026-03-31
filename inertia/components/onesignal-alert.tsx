import User from '#models/user'
import { CloseOutlined } from '@ant-design/icons'
import { usePage } from '@inertiajs/react'
import { Alert, AlertProps, Button } from 'antd'
import React from 'react'
import OneSignal from 'react-onesignal'
import styles from '~/styles'
import useI18n from '~/utility/i18n'
import { useOneSignal } from '~/utility/onesignal'

interface IOneSignalAlertProps {
	nonDismissable?: boolean
	alertType?: AlertProps['type']
	style?: React.CSSProperties
}

const OneSignalAlert: React.FC<IOneSignalAlertProps> = ({ nonDismissable, alertType = 'warning', style }) => {
	const { status, checkPermission } = useOneSignal()
	const { t } = useI18n()
	const { user, locale } = (usePage() as { props: { user: User; locale: string } }).props

	/* STYLES */
	const oa = styles.onesignalalert()

	const promptOneSignal = async () => {
		OneSignal.Notifications.requestPermission().then(async accepted => {
			if (accepted) {
				await OneSignal.login(String(user.id))
				OneSignal.User.setLanguage(locale)
				checkPermission()
			}
		})
	}

	return (
		status !== undefined && status !== 'granted'
		&& (localStorage.getItem('notification-alert-dismissed') !== 'true' || nonDismissable)
		&& (
			<Alert
				title={t('notifications.disabled')}
				description={t('notifications.description')}
				showIcon
				type={alertType}
				{...(!nonDismissable && {
					closable: {
						closeIcon: <CloseOutlined />,
						onClose: () => {
							localStorage.setItem('notification-alert-dismissed', 'true')
						},
					},
				})}
				style={style}
				action={
					<Button
						size='small'
						type='primary'
						onClick={() => promptOneSignal()}
						style={oa.notificationCloseButton({ alertType })}
					>
						{t('notifications.turnon')}
					</Button>
				}
			/>
		)
	)
}

export default OneSignalAlert
