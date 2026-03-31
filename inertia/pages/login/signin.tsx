import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Head, router, useForm } from '@inertiajs/react'
import { Button, Input, message, Typography } from 'antd'
import { login } from '~/api/UsersController'
import styles from '~/styles'
import useI18n from '~/utility/i18n'
import { hooks } from '~/utility/snacks'

const Signin = () => {
	/* HOOKS */
	const { t } = useI18n()
	const { data, setData } = useForm({
		username: '',
		password: '',
	})
	const [messageApi, contextHolder] = message.useMessage()
	const { fakeHandleRandomizer } = hooks()

	/* STYLES */
	const ls = styles.login()

	/**
	 * Handles the login process by sending the username and password
	 */
	const handleLogin = async () => {
		try {
			const response = await login(data)
			if (response?.success) {
				router.visit('/', { data: { login: true } })
			} else {
				messageApi.open({
					type: 'error',
					content: t('account.login.error'),
				})
				console.error('Login failed:', response?.message)
			}
		} catch (error) {
			console.error('Error during login:', error)
		}
	}

	return (
		<>
			{contextHolder}
			<Head title='Login' />

			{/* Username */}
			<Typography.Text>
				{t('account.login.username')}
			</Typography.Text>
			<Input
				placeholder={fakeHandleRandomizer()}
				variant='filled'
				style={ls.input}
				prefix={<UserOutlined style={ls.icon} height={'17px'} />}
				onChange={e => setData('username', e.target.value)}
			/>

			{/* Password */}
			<Typography.Text style={{ marginTop: 16 }}>
				{t('account.login.password')}
			</Typography.Text>
			<Input.Password
				placeholder='••••••••'
				variant='filled'
				style={ls.input}
				prefix={<LockOutlined style={ls.icon} height={'17px'} />}
				onChange={e => setData('password', e.target.value)}
				onPressEnter={handleLogin}
			/>

			{/* Forgot password */}
			<Button type='link' style={ls.forgotPassword}>
				{t('account.login.forgotpassword')}
			</Button>

			{/* Login */}
			<Button
				type='primary'
				size='large'
				style={ls.loginButton}
				onClick={handleLogin}
				disabled={!data.username || !data.password}
			>
				{t('account.login.login')}
			</Button>
		</>
	)
}

export default Signin
