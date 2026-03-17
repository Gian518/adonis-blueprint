import { CSSProperties } from 'react'
import { BP_ORDER, type Breakpoint, useBreakpoint } from './breakpoints'

/**
 * Type for values that can be responsive (simple value or breakpoint-keyed object)
 */
type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>

/**
 * Type for CSS properties that can have responsive values
 */
type ResponsiveCSSProperties = {
	[K in keyof CSSProperties]: ResponsiveValue<CSSProperties[K]>
}

/**
 * Top-level breakpoint style object (e.g., {base: {...}, md: {...}})
 */
type BreakpointStyle = {
	[K in Breakpoint]?: Partial<CSSProperties>
}

/**
 * Input can be either normal CSS or breakpoint-keyed or property-level responsive
 */
type CSSInput = Partial<ResponsiveCSSProperties> | BreakpointStyle

/**
 * Checks if an object has breakpoint keys at top level
 */
function isBreakpointStyle(obj: Record<string, any>): obj is BreakpointStyle {
	const keys = Object.keys(obj)
	return keys.length > 0 && keys.every(k => BP_ORDER.includes(k as Breakpoint))
}

/**
 * Checks if a value is a responsive breakpoint-keyed object
 */
function isResponsiveValue(value: any): value is Record<Breakpoint, any> {
	if (typeof value !== 'object' || value === null || Array.isArray(value)) return false
	const keys = Object.keys(value)
	return keys.length > 0 && keys.every(k => BP_ORDER.includes(k as Breakpoint))
}

/**
 * Resolves css input to final CSSProperties based on active breakpoint
 */
function resolveCSS(input: CSSInput, activeBp: Breakpoint): CSSProperties {
	// Check if it's a top-level breakpoint style
	if (isBreakpointStyle(input)) {
		let result: CSSProperties = {}
		for (const bp of BP_ORDER) {
			if (input[bp]) {
				result = { ...result, ...input[bp] }
			}
			if (bp === activeBp) break
		}
		return result
	}

	// Otherwise, resolve property-level responsive values
	const result: Record<string, any> = {}
	for (const key in input) {
		const value = (input as Record<string, any>)[key]

		if (isResponsiveValue(value)) {
			// Progressive application of breakpoint-specific values
			let resolvedValue = value.base
			for (const bp of BP_ORDER) {
				if (value[bp] !== undefined) {
					resolvedValue = value[bp]
				}
				if (bp === activeBp) break
			}
			result[key] = resolvedValue
		} else {
			result[key] = value
		}
	}

	return result as CSSProperties
}

/**
 * Hook to define CSS with breakpoint support
 * Supports three syntaxes:
 * - css({width: "100%"})
 * - css({width: {base: "50%", md: "100%"}})
 * - css({base: {width: "50%"}, md: {width: "100%"}})
 */
export function css(styles: CSSInput): CSSProperties {
	const bp = useBreakpoint()
	return resolveCSS(styles, bp)
}

/**
 * Factory that creates a style resolver with variants
 */
function createVariantFactory(
	baseStyles: CSSInput,
	variants?: Record<string, Record<string, CSSInput>>,
) {
	return (variantConfig?: Record<string, string>, activeBp?: Breakpoint): CSSProperties => {
		if (!activeBp) {
			throw new Error('activeBp must be provided to variant factory')
		}

		let result = resolveCSS(baseStyles, activeBp)

		if (variants && variantConfig) {
			for (const [variantName, variantValue] of Object.entries(variantConfig)) {
				if (variants[variantName]?.[variantValue]) {
					const variantStyles = resolveCSS(variants[variantName][variantValue], activeBp)
					result = { ...result, ...variantStyles }
				}
			}
		}

		return result
	}
}

/**
 * Hook to define CSS with variant support
 * Returns a function that accepts variant configuration
 */
export function vss(
	baseStyles: CSSInput,
	variants?: Record<string, Record<string, CSSInput>>,
): (variantConfig?: Record<string, string>) => CSSProperties {
	const bp = useBreakpoint()
	const factory = createVariantFactory(baseStyles, variants)

	return (variantConfig?: Record<string, string>) => factory(variantConfig, bp)
}

/**
 * Factory that creates a multiplex style resolver
 */
function createMuxFactory(
	slots: Record<string, Record<string, CSSInput>>,
) {
	return (slotConfig?: Record<string, string>, activeBp?: Breakpoint): Record<string, CSSProperties> => {
		if (!activeBp) {
			throw new Error('activeBp must be provided to mux factory')
		}

		const result: Record<string, CSSProperties> = {}

		if (slotConfig) {
			for (const [slotName, slotValue] of Object.entries(slotConfig)) {
				if (slots[slotName]?.[slotValue]) {
					result[slotName] = resolveCSS(slots[slotName][slotValue], activeBp)
				}
			}
		}

		return result
	}
}

/**
 * Hook to define CSS with multiple slots and variant support
 * Returns a function that accepts slot configuration
 */
export function mux(
	slots: Record<string, Record<string, CSSInput>>,
): (slotConfig?: Record<string, string>) => Record<string, CSSProperties> {
	const bp = useBreakpoint()
	const factory = createMuxFactory(slots)

	return (slotConfig?: Record<string, string>) => factory(slotConfig, bp)
}

/**
 * A simple function that merges more styles together
 * @param args CSSProperties different objects to merge together
 * @returns The merged style
 */
export const cx = (...args: (CSSProperties | undefined)[]) => {
	return args.reduce((acc, arg) => {
		if (!arg) return acc

		return { ...acc, ...arg }
	}, {})
}
