import type { MotionState } from '@/state'
import type { Options } from '@/types'
/**
 * @public
 */
export interface AnimationControls {
  /**
   * Subscribes a component's animation controls to this.
   *
   * @param controls - The controls to subscribe
   * @returns An unsubscribe function.
   *
   * @internal
   */
  subscribe: (state: MotionState) => () => void

  /**
   * Starts an animation on all linked components.
   *
   * @remarks
   *
   * ```jsx
   * controls.start("variantLabel")
   * controls.start({
   *   x: 0,
   *   transition: { duration: 1 }
   * })
   * ```
   *
   * @param definition - Properties or variant label to animate to
   * @param transition - Optional `transtion` to apply to a variant
   * @returns - A `Promise` that resolves when all animations have completed.
   *
   * @public
   */
  start: (
    definition: Options['animate'],
    transitionOverride?: Options['transition']
  ) => Promise<any>

  /**
   * Instantly set to a set of properties or a variant.
   *
   * ```jsx
   * // With properties
   * controls.set({ opacity: 0 })
   *
   * // With variants
   * controls.set("hidden")
   * ```
   *
   * @privateRemarks
   * We could perform a similar trick to `.start` where this can be called before mount
   * and we maintain a list of of pending actions that get applied on mount. But the
   * expectation of `set` is that it happens synchronously and this would be difficult
   * to do before any children have even attached themselves. It's also poor practise
   * and we should discourage render-synchronous `.start` calls rather than lean into this.
   *
   * @public
   */
  set: (definition: Options['animate']) => void

  /**
   * Stops animations on all linked components.
   *
   * ```jsx
   * controls.stop()
   * ```
   *
   * @public
   */
  stop: () => void
  mount: () => () => void
}
