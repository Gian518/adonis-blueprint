import { Head } from '@inertiajs/react'
import { message } from 'antd'
import { useEffect } from 'react'
import useI18n from '~/utility/i18n'

export const Home = () => {
	const { t } = useI18n()
	const [messageApi, contextHolder] = message.useMessage()

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
		</>
	)
}

export default Home
