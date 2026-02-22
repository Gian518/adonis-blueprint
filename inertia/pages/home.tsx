import { Head } from '@inertiajs/react'
import { Button } from 'antd'
import useI18n from '~/utility/i18n'

export default function Home() {
	const { t } = useI18n()

	return (
		<>
			<Head title='Homepage' />
			<h1>{t('messages.greetings')}</h1>
			<Button type='primary'>{t('messages.greetings')}</Button>
		</>
	)
}
