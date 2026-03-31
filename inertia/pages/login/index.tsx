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

	/* STYLES */
	const ls = styles.login()
	const gs = styles.grid()

	return (
		<>
			<Row>
				<Col {...gs.col}>
					<GlassCard innerStyle={ls.glassContainer}>
						{/* Logo */}
						<img src={logo} alt='Logo' width={96} />
						{/* Title */}
						<h1 style={ls.heading}>{t('generic.appname')}</h1>
						{/* Subtitle */}
						<p style={ls.subheading}>{t('account.login.motto')}</p>

						<div style={ls.form}>
							{/* Login/Registration tabs */}
							<Segmented
								options={[
									{ label: t('account.login.login'), value: 'login' },
									{ label: t('account.register.signup'), value: 'register' },
								]}
								styles={{ root: ls.tabsContainer, item: ls.tabsButton, label: ls.tabsText }}
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
