import type { Options } from '@/types'
import type { DynamicAnimationOptions, Variant } from 'framer-motion'
import type { IntrinsicElementAttributes } from 'vue'

export function resolveVariant(
  definition?: Options['initial'],
  variants?: Options['variants'],
  custom?: Options['custom'],
): Variant | undefined {
  if (typeof definition === 'object') {
    return definition
  }
  else if (definition && variants) {
    const variant = variants[definition as string]
    return typeof variant === 'function' ? variant(custom) : variant
  }
}

export function hasChanged(a: any, b: any): boolean {
  if (typeof a !== typeof b)
    return true
  if (Array.isArray(a) && Array.isArray(b))
    return !shallowCompare(a, b)
  return a !== b
}

export function shallowCompare(next: any[], prev: any[]) {
  const prevLength = prev.length

  if (prevLength !== next.length)
    return false

  for (let i = 0; i < prevLength; i++) {
    if (prev[i] !== next[i])
      return false
  }

  return true
}

export function addUniqueItem<T>(array: T[], item: T) {
  !array.includes(item) && array.push(item)
}

export function removeItem<T>(array: T[], item: T) {
  const index = array.indexOf(item)

  index !== -1 && array.splice(index, 1)
}

export function getOptions(options: DynamicAnimationOptions, key: string): DynamicAnimationOptions {
  return options[key as any] ? { ...options, ...options[key as any] } : { ...options }
}

export function isCssVar(name: string) {
  return name?.startsWith('--')
}

export function noop() {}
export const noopReturn = <V>(v: V) => v

export function isNumber(value: any): boolean {
  return typeof value === 'number'
}

type ElementType = keyof IntrinsicElementAttributes

export const svgElements = [
  'animate',
  'circle',
  'defs',
  'desc',
  'ellipse',
  'g',
  'image',
  'line',
  'filter',
  'marker',
  'mask',
  'metadata',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'rect',
  'stop',
  'svg',
  'switch',
  'symbol',
  'text',
  'tspan',
  'use',
  'view',
  'clipPath',
  'feBlend',
  'feColorMatrix',
  'feComponentTransfer',
  'feComposite',
  'feConvolveMatrix',
  'feDiffuseLighting',
  'feDisplacementMap',
  'feDistantLight',
  'feDropShadow',
  'feFlood',
  'feFuncA',
  'feFuncB',
  'feFuncG',
  'feFuncR',
  'feGaussianBlur',
  'feImage',
  'feMerge',
  'feMergeNode',
  'feMorphology',
  'feOffset',
  'fePointLight',
  'feSpecularLighting',
  'feSpotLight',
  'feTile',
  'feTurbulence',
  'foreignObject',
  'linearGradient',
  'radialGradient',
  'textPath',
] as const
type UnionStringArray<T extends Readonly<string[]>> = T[number]
export type SVGElements = UnionStringArray<typeof svgElements>

const svgElementSet = new Set(svgElements)
export function isSVGElement(as: ElementType): as is SVGElements {
  return svgElementSet.has(as as SVGElements)
}
