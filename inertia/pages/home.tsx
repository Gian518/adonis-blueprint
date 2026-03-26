import { Head } from '@inertiajs/react'
import { Button, message } from 'antd'
import { useEffect } from 'react'
import OneSignal from 'react-onesignal'
import { RC } from '~/models/components'
import useI18n from '~/utility/i18n'

export const Home: RC = ({ user, locale }) => {
	const { t } = useI18n()
	const [messageApi, contextHolder] = message.useMessage()

	const promptOneSignal = async () => {
		OneSignal.Notifications.requestPermission().then(async accepted => {
			if (accepted) {
				await OneSignal.login(String(user.id))
				OneSignal.User.setLanguage(locale)
			}
		})
	}

	useEffect(() => {
		const loggedIn = sessionStorage.getItem('loggedIn') == 'true'
		if (loggedIn) {
			messageApi.open({
				type: 'success',
				content: t('account.login.success'),
			})
			sessionStorage.removeItem('loggedIn')
		}
		const register = sessionStorage.getItem('register') == 'true'
		if (register) {
			messageApi.open({
				type: 'success',
				content: t('account.register.success'),
			})
			sessionStorage.removeItem('register')
		}
	}, [])

	return (
		<>
			{contextHolder}
			<Head title='Homepage' />

			<Button onClick={() => promptOneSignal()} type='primary'>Prompt OneSignal</Button>
		</>
	)
}

export default Home
