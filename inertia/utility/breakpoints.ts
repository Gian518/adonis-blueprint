import { useEffect, useState } from 'react'

export const BREAKPOINTS: Record<string, number> = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
}

export const BP_ORDER = ['base', 'sm', 'md', 'lg', 'xl'] as const
export type Breakpoint = (typeof BP_ORDER)[number]

/**
 * Determines the active breakpoint based on window width
 */
export function getBreakpointFromWidth(width: number): Breakpoint {
	if (width >= BREAKPOINTS.xl) return 'xl'
	if (width >= BREAKPOINTS.lg) return 'lg'
	if (width >= BREAKPOINTS.md) return 'md'
	if (width >= BREAKPOINTS.sm) return 'sm'
	return 'base'
}

/**
 * Hook to get the current active breakpoint
 * @param ssrDefault Breakpoint to use during SSR
 * @returns Current active breakpoint
 */
export function useBreakpoint(ssrDefault: Breakpoint = 'base'): Breakpoint {
	const [bp, setBp] = useState<Breakpoint>(() =>
		typeof window === 'undefined' ? ssrDefault : getBreakpointFromWidth(window.innerWidth)
	)

	useEffect(() => {
		if (typeof window === 'undefined') return

		let raf: number
		const onResize = () => {
			cancelAnimationFrame(raf)
			raf = requestAnimationFrame(() => setBp(getBreakpointFromWidth(window.innerWidth)))
		}

		window.addEventListener('resize', onResize)
		return () => {
			cancelAnimationFrame(raf)
			window.removeEventListener('resize', onResize)
		}
	}, [])

	return bp
}
