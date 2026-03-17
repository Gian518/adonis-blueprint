import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import useI18n from './i18n'

export const hooks = () => {
	/* HOOKS */
	const { t } = useI18n()

	return {
		/**
		 * This is a fun little feature that randomly changes
		 * the placeholder of the username input field
		 * to a fake handle every 2 seconds.
		 */
		fakeHandleRandomizer: () => {
			const [fakeHandle, setFakeHandle] = useState('')
			useEffect(() => {
				const fakeHandleRandomizer = () => {
					const fakeHandles = [
						t('account.login.fakehandle1'),
						t('account.login.fakehandle2'),
						t('account.login.fakehandle3'),
						t('account.login.fakehandle4'),
						t('account.login.fakehandle5'),
					]
					const randomHandle = fakeHandles[Math.floor(Math.random() * fakeHandles.length)]
					setFakeHandle(randomHandle)
				}

				fakeHandleRandomizer()

				const fakeHandleInterval = setInterval(() => {
					fakeHandleRandomizer()
				}, 2000)

				return () => clearInterval(fakeHandleInterval)
			}, [])

			return fakeHandle
		},
	}
}

export const statics = {
	/**
	 * Checks if the error is Axios and return data from APIs
	 * @param error The error to return
	 * @returns Data from APIs
	 */
	apiError: (error: AxiosError<any, any>) => {
		if (axios.isAxiosError(error) && error.response) {
			return error.response.data
		}
	},
}
