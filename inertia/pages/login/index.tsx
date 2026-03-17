import { Col, Row, Segmented } from 'antd'
import { useState } from 'react'
import logo from '~/assets/logo.svg'
import GlassCard from '~/components/glass-card'
import styles from '~/styles'
import useI18n from '~/utility/i18n'
import Register from './register'
import Signin from './signin'

const Login = () => {
	/* STATES */
	const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')

	/* HOOKS */
	const { t } = useI18n()
	const { container } = styles.common()
	const {
		glassContainer,
		heading,
		subheading,
		form,
		tabsContainer,
		tabsButton,
		tabsText,
	} = styles.login()

	return (
		<>
			<Row style={container}>
				<Col md={{ span: 12, offset: 6 }}>
					<GlassCard innerStyle={glassContainer}>
						{/* Logo */}
						<img src={logo} alt='Logo' width={96} />
						{/* Title */}
						<h1 style={heading}>{t('generic.appname')}</h1>
						{/* Subtitle */}
						<p style={subheading}>{t('account.login.motto')}</p>

						<div style={form}>
							{/* Login/Registration tabs */}
							<Segmented
								options={[
									{ label: t('account.login.login'), value: 'login' },
									{ label: t('account.register.signup'), value: 'register' },
								]}
								styles={{ root: tabsContainer, item: tabsButton, label: tabsText }}
								value={activeTab}
								onChange={(value) => setActiveTab(value as 'login' | 'register')}
							/>

							{activeTab === 'login' && <Signin />}
							{activeTab === 'register' && <Register />}
						</div>
					</GlassCard>
				</Col>
			</Row>
		</>
	)
}

export default Login
