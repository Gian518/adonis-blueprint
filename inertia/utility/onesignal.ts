import { useEffect, useState } from 'react'
import OneSignal from 'react-onesignal'

/**
 * Initialize One Signal
 * @param oneSignalAppID The OneSignal App ID
 */
export const setupOneSignal = async (oneSignalAppID: string) => {
	/**
	 * In order to avoid SSR problems, the "oneSignalInitialized" check
	 * is done after checking the existence of the window object.
	 */
	if (typeof window !== 'undefined') {
		if (!window.__oneSignalInitialized) {
			await OneSignal.init({
				appId: oneSignalAppID,
				allowLocalhostAsSecureOrigin: true,
				autoResubscribe: true,
			})
			await OneSignal.Debug.setLogLevel('trace')

			window.__oneSignalInitialized = true
		}
	}
}

export const useOneSignal = () => {
	const [permission, setPermission] = useState<NotificationPermission | undefined>(undefined)

	const checkPermission = () => {
		const currentPermission = OneSignal.Notifications.permissionNative
		setPermission(currentPermission)
	}

	useEffect(() => {
		/** @todo Find a better way to get the permission status without using a timeout */
		const permissionInterval = setTimeout(() => {
			checkPermission()
		}, 100)

		return () => clearTimeout(permissionInterval)
	}, [])

	return {
		/**
		 * Current permission status of OneSignal
		 */
		status: permission,
		checkPermission,
	}
}
