import { Head } from '@inertiajs/react'
import { Button } from 'antd'
import OneSignal from 'react-onesignal'

export default function Home() {
	const promptOneSignal = async () => {
		await OneSignal.Notifications.requestPermission()
	}

	return (
		<>
			<Head title='Homepage' />

			<Button onClick={() => promptOneSignal()} type='primary'>Prompt OneSignal</Button>
		</>
	)
}
