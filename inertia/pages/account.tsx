import User from '#models/user'
import { IdcardOutlined, LockOutlined, LogoutOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Head, router, useForm } from '@inertiajs/react'
import { Avatar, Button, Col, Flex, Input, message, Row, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { changePassword, changePersonalData, logout } from '~/api'
import GlassCard from '~/components/glass-card'
import styles from '~/styles'
import { css, cx } from '~/utility/css'
import useI18n from '~/utility/i18n'

interface IProps {
	user: User
}

export const Account = ({ user }: IProps) => {
	/* STATES */
	const [isEditing, setIsEditing] = useState(false)

	/* HOOKS */
	const { t } = useI18n()
	const { container, standardFlex, mt16, mt32, w100, h100 } = styles.common()
	const { pageTitle, editButton, avatar, icon, fullName, username, sectionTitle, input, inputIcon, exitButton } = styles
		.account()
	const { ghosted, danger } = styles.button()
	const [messageApi, contextHolder] = message.useMessage()
	const {
		data: personalData,
		setData: setPersonalData,
		errors: personalErrors,
		setError: setPersonalError,
		clearErrors: clearPersonalErrors,
	} = useForm({
		fullName: '',
		username: '',
		email: '',
	})
	const {
		data: passwordData,
		setData: setPasswordData,
		errors: passwordErrors,
		setError: setPasswordError,
		clearErrors: clearPasswordErrors,
	} = useForm({
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
	})

	/* BOOT */
	useEffect(() => {
		setDefault()
	}, [])

	/**
	 * Delete inputs and restore original user data
	 */
	const setDefault = () => {
		setPersonalData('fullName', user.fullName!)
		setPersonalData('username', user.username)
		setPersonalData('email', user.email!)
		setPasswordData('currentPassword', '')
		setPasswordData('newPassword', '')
		setPasswordData('confirmPassword', '')

		clearPersonalErrors()
		clearPasswordErrors()
	}

	/**
	 * [API] Change personal data
	 */
	const handleChangePersonalData = async () => {
		try {
			const response = await changePersonalData(personalData)
			if (response.success) {
				messageApi.success({
					content: t('account.profile.accountupdated'),
				})
				setPersonalData('fullName', response.user!.fullName!)
				setPersonalData('username', response.user!.username)
				setPersonalData('email', response.user!.email!)

				setIsEditing(false)
				router.reload()
			} else if (response.errors) {
				response.errors.forEach((error) => {
					setPersonalError(error.field, error.message)
					messageApi.error({
						content: error.message,
					})
				})
			}
		} catch (error) {
			messageApi.error(t('generic.genericerror'))
			console.error('Error in Account component:', error)
		}
	}

	/**
	 * [API] Change password
	 */
	const handleChangePassword = async () => {
		try {
			const response = await changePassword(passwordData)
			if (response.success) {
				messageApi.success({
					content: t('account.profile.passwordchanged'),
				})

				setIsEditing(false)
				router.reload()
			} else if (response.errors) {
				response.errors.forEach(error => {
					setPasswordError(error.field, error.message)
					messageApi.error({
						content: error.message,
					})
				})
			}
		} catch (error) {
			messageApi.error(t('generic.genericerror'))
			console.error('Error in Account component:', error)
		}
	}

	const handleLogout = async () => {
		try {
			const response = await logout()
			if (response.success) {
				router.visit('/')
			} else {
				throw response.message
			}
		} catch (error) {
			messageApi.error(t('generic.genericerror'))
			console.error('Error in Account component:', error)
		}
	}

	return (
		<>
			{contextHolder}
			<Head title={t('account.profile.pagename')} />

			<Row style={container}>
				<Col md={{ span: 12, offset: 6 }}>
					{/* Header */}
					<Flex justify='space-between' align='center'>
						<Typography.Title style={pageTitle}>{t('account.profile.pagename')}</Typography.Title>
						<Button
							type='text'
							style={editButton({ ...(isEditing && { editing: 'true' }) })}
							onClick={() => {
								if (isEditing) {
									setDefault()
								}
								setIsEditing(!isEditing)
							}}
						>
							{t(isEditing ? 'generic.cancel' : 'account.profile.edit')}
						</Button>
					</Flex>

					{/* Avatar */}
					<Flex justify='center' align='center' vertical>
						{/* Propic */}
						<Avatar size={102} icon={<UserOutlined style={icon} />} style={avatar} />
						{/* Name */}
						<Typography.Title level={2} style={fullName}>{user.fullName}</Typography.Title>
						{/* Username */}
						<Typography.Text style={username}>@{user.username}</Typography.Text>
					</Flex>

					{/* Personal details */}
					<GlassCard
						title={t('account.profile.personaldetails')}
						containerStyle={css({ marginTop: 24 })}
						innerStyle={standardFlex}
					>
						{/* Full name */}
						<Typography.Text style={sectionTitle}>
							{t('account.register.fullname')}
						</Typography.Text>
						<Input
							value={personalData.fullName}
							variant='filled'
							prefix={<IdcardOutlined style={inputIcon({ ...(!isEditing && { disabled: 'true' }) })} height={'17px'} />}
							disabled={!isEditing}
							style={cx(input({ ...(!isEditing && { disabled: 'true' }) }))}
							onChange={e => setPersonalData('fullName', e.target.value)}
							onPressEnter={handleChangePersonalData}
							{...(personalErrors.fullName && { status: 'error' })}
						/>
						{personalErrors.fullName && <Typography.Text type='danger'>{personalErrors.fullName}</Typography.Text>}

						{/* Username */}
						<Typography.Text style={sectionTitle}>
							{t('account.login.username')}
						</Typography.Text>
						<Input
							value={personalData.username}
							variant='filled'
							prefix={<UserOutlined style={inputIcon({ ...(!isEditing && { disabled: 'true' }) })} height={'17px'} />}
							disabled={!isEditing}
							style={cx(input({ ...(!isEditing && { disabled: 'true' }) }))}
							onChange={e => setPersonalData('username', e.target.value)}
							onPressEnter={handleChangePersonalData}
							{...(personalErrors.username && { status: 'error' })}
						/>
						{personalErrors.username && <Typography.Text type='danger'>{personalErrors.username}</Typography.Text>}

						{/* E-Mail address */}
						<Typography.Text style={sectionTitle}>
							{t('account.register.email')}
						</Typography.Text>
						<Input
							value={personalData.email}
							variant='filled'
							prefix={<MailOutlined style={inputIcon({ ...(!isEditing && { disabled: 'true' }) })} height={'17px'} />}
							disabled={!isEditing}
							style={input({ ...(!isEditing && { disabled: 'true' }) })}
							onChange={e => setPersonalData('email', e.target.value)}
							onPressEnter={handleChangePersonalData}
							{...(personalErrors.email && { status: 'error' })}
						/>
						{personalErrors.email && <Typography.Text type='danger'>{personalErrors.email}</Typography.Text>}

						{isEditing
							&& (
								<>
									{/* Save details button */}
									<Button
										type='primary'
										size='large'
										style={cx(mt16, w100)}
										disabled={!personalData.fullName || !personalData.email}
										onClick={() => handleChangePersonalData()}
									>
										{t('account.profile.savedetails')}
									</Button>
								</>
							)}
					</GlassCard>

					{!isEditing
						&& (
							<Button
								color='danger'
								style={cx(w100, h100, mt16, ghosted, danger, exitButton)}
								icon={<LogoutOutlined size={16} />}
								onClick={() => handleLogout()}
							>
								{t('account.profile.logout')}
							</Button>
						)}

					{isEditing
						&& (
							<>
								{/* Password change */}
								<GlassCard title={t('account.login.password')} containerStyle={mt32} innerStyle={standardFlex}>
									{/* Current password */}
									<Typography.Text style={sectionTitle}>
										{t('account.profile.currentpassword')}
									</Typography.Text>
									<Input.Password
										placeholder='••••••••'
										variant='filled'
										prefix={
											<LockOutlined
												style={inputIcon()}
												height={'17px'}
											/>
										}
										style={input()}
										value={passwordData.currentPassword}
										onChange={e => setPasswordData('currentPassword', e.target.value)}
										{...(passwordErrors.currentPassword && { status: 'error' })}
									/>
									{passwordErrors.currentPassword && (
										<Typography.Text type='danger'>{passwordErrors.currentPassword}</Typography.Text>
									)}

									{/* New password */}
									<Typography.Text style={sectionTitle}>
										{t('account.profile.newpassword')}
									</Typography.Text>
									<Input.Password
										placeholder='••••••••'
										variant='filled'
										prefix={
											<LockOutlined
												style={inputIcon()}
												height={'17px'}
											/>
										}
										style={input()}
										value={passwordData.newPassword}
										onChange={e => setPasswordData('newPassword', e.target.value)}
										{...(passwordErrors.newPassword && { status: 'error' })}
									/>
									{passwordErrors.newPassword && (
										<Typography.Text type='danger'>{passwordErrors.newPassword}</Typography.Text>
									)}

									{/* Confirm password */}
									<Typography.Text style={sectionTitle}>
										{t('account.register.confirmpassword')}
									</Typography.Text>
									<Input.Password
										placeholder='••••••••'
										variant='filled'
										prefix={<LockOutlined style={inputIcon()} height={'17px'} />}
										style={input()}
										value={passwordData.confirmPassword}
										onChange={e => setPasswordData('confirmPassword', e.target.value)}
										onPressEnter={handleChangePassword}
										{...(passwordErrors.confirmPassword && { status: 'error' })}
									/>
									{passwordErrors.confirmPassword && (
										<Typography.Text type='danger'>{passwordErrors.confirmPassword}</Typography.Text>
									)}

									{/* Change password button */}
									<Button
										type='primary'
										size='large'
										style={cx(mt16, w100)}
										disabled={!passwordData.currentPassword || !passwordData.newPassword
											|| !passwordData.confirmPassword}
										onClick={() => handleChangePassword()}
									>
										{t('account.profile.changepassword')}
									</Button>
								</GlassCard>
							</>
						)}
				</Col>
			</Row>
		</>
	)
}

export default Account
