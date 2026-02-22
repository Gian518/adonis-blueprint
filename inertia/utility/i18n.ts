import { usePage } from '@inertiajs/react'

const useI18n = () => {
	const page = usePage() as {
		props: { localeTranslations: Record<string, string>; fallbackTranslations: Record<string, string> }
	}

	return {
		t: (key: string) => page.props.localeTranslations[key] || page.props.fallbackTranslations[key] || key,
	}
}

export default useI18n
