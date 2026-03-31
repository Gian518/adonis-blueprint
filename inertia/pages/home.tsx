import { Head } from '@inertiajs/react'
import OneSignalAlert from '~/components/onesignal-alert'

export default function Home() {
	return (
		<>
			<Head title='Homepage' />

			<OneSignalAlert />
		</>
	)
}
