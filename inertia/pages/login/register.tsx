import { LockOutlined, MailOutlined, MehOutlined, UserOutlined } from '@ant-design/icons'
import { Head, router, useForm } from '@inertiajs/react'
import { Button, Input, message, Typography } from 'antd'
import { register } from '~/api'
import styles from '~/styles'
import useI18n from '~/utility/i18n'
import { hooks } from '~/utility/snacks'

const Register = () => {
	/* HOOKS */
	const { t } = useI18n()
	const { fakeHandleRandomizer } = hooks()
	const [messageApi, contextHolder] = message.useMessage()
	const { data, setData, processing, errors, setError, clearErrors } = useForm({
		fullName: '',
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	})

	/* STYLES */
	const {
		icon,
		input,
		loginButton,
	} = styles.login()

	const handleRegister = async () => {
		try {
			clearErrors()
			const response = await register(data)
			if (response?.success) {
				sessionStorage.setItem('register', 'true')
				router.visit('/')
			} else {
				response.errors?.forEach(error => {
					setError(error.field, error.message)
					messageApi.open({
						type: 'error',
						content: error.message,
					})
				})
				console.error('Register failed:', response?.errors)
			}
		} catch (error) {
			console.error('Error in Register component:', error)
		}
	}

	const changeField = (field: keyof typeof data, value: string) => {
		clearErrors(field)
		setData(field, value)
	}

	return (
		<>
			{contextHolder}
			<Head title='Register' />

			{/* Full name */}
			<Typography.Text>
				{t('account.register.fullname')}
			</Typography.Text>
			<Input
				placeholder={t('account.register.fullnameplaceholder')}
				variant='filled'
				style={input}
				prefix={<MehOutlined style={icon} height={'17px'} />}
				onChange={e => changeField('fullName', e.target.value)}
				{...(errors.fullName && { status: 'error' })}
			/>

			{/* Username */}
			<Typography.Text style={{ marginTop: 16 }}>
				{t('account.login.username')}
			</Typography.Text>
			<Input
				placeholder={fakeHandleRandomizer()}
				variant='filled'
				style={input}
				prefix={<UserOutlined style={icon} height={'17px'} />}
				onChange={e => changeField('username', e.target.value)}
				{...(errors.username && { status: 'error' })}
			/>
			{errors.username
				&& <Typography.Text type='danger'>{errors.username}</Typography.Text>}

			{/* E-Mail address */}
			<Typography.Text style={{ marginTop: 16 }}>
				{t('account.register.email')}
			</Typography.Text>
			<Input
				placeholder={t('account.register.emailplaceholder')}
				variant='filled'
				style={input}
				prefix={<MailOutlined style={icon} height={'17px'} />}
				onChange={e => changeField('email', e.target.value)}
				{...(errors.email && { status: 'error' })}
			/>
			{errors.email
				&& <Typography.Text type='danger'>{errors.email}</Typography.Text>}

			{/* Password */}
			<Typography.Text style={{ marginTop: 16 }}>
				{t('account.login.password')}
			</Typography.Text>
			<Input.Password
				placeholder='••••••••'
				variant='filled'
				style={input}
				prefix={<LockOutlined style={icon} height={'17px'} />}
				onChange={e => changeField('password', e.target.value)}
				{...(errors.password && { status: 'error' })}
			/>
			{errors.password
				&& <Typography.Text type='danger'>{errors.password}</Typography.Text>}

			{/* Confirm password */}
			<Typography.Text style={{ marginTop: 16 }}>
				{t('account.register.confirmpassword')}
			</Typography.Text>
			<Input.Password
				placeholder='••••••••'
				variant='filled'
				style={input}
				prefix={<LockOutlined style={icon} height={'17px'} />}
				onChange={e => changeField('confirmPassword', e.target.value)}
				{...(errors.confirmPassword && { status: 'error' })}
			/>
			{errors.confirmPassword
				&& <Typography.Text type='danger'>{errors.confirmPassword}</Typography.Text>}

			{/* Register button */}
			<Button
				type='primary'
				size='large'
				style={loginButton}
				onClick={handleRegister}
				disabled={!data.username || !data.email || !data.password || !data.confirmPassword || processing}
			>
				{t('account.register.signup')}
			</Button>
		</>
	)
}

export default Register
