import { UserOutlined } from '@ant-design/icons'
import { Head, Link } from '@inertiajs/react'
import { Avatar, Col, Flex, message, Row, Typography } from 'antd'
import { DateTime } from 'luxon'
import { useEffect } from 'react'
import OneSignalAlert from '~/components/onesignal-alert'
import { RC } from '~/models/components'
import styles from '~/styles'
import useI18n from '~/utility/i18n'

export const Home: RC = ({ user }) => {
	const { t } = useI18n()
	const [messageApi, contextHolder] = message.useMessage()
	const sc = styles.common()
	const hs = styles.home()

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

	const getWelcomeText = () => {
		const now = DateTime.now()
		if (now.hour >= 5 && now.hour < 12) {
			return t('home.goodmorning')
		} else if (now.hour >= 12 && now.hour < 18) {
			return t('home.goodafternoon')
		} else {
			return t('home.goodevening')
		}
	}

	return (
		<>
			{contextHolder}
			<Head title='Homepage' />

			<Row style={sc.container}>
				<Col md={{ span: 12, offset: 6 }}>
					<Flex justify='space-between' align='center'>
						{/* Welcome text */}
						<div>
							<Typography.Text style={hs.welcome}>{getWelcomeText()}</Typography.Text>
							<br />
							<Typography.Text style={hs.name}>{user.fullName}</Typography.Text>
						</div>

						{/* Avatar button */}
						<Link href='/account'>
							<Avatar
								size={40}
								icon={<UserOutlined style={hs.icon} />}
								style={sc.defaultAvatar}
							/>
						</Link>
					</Flex>

					{/* OneSignal alert */}
					<OneSignalAlert style={hs.notificationAlert} />
				</Col>
			</Row>
		</>
	)
}

export default Home
