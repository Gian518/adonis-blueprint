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
				welcomeNotification: {
					disable: true,
					message: '',
				},
			})
			await OneSignal.Debug.setLogLevel('trace')

			window.__oneSignalInitialized = true
		}
	}
}
