import type { Ref } from 'vue'
import { isRef, unref, watch } from 'vue'
import type { MotionValue } from 'framer-motion/dom'
import { JSAnimation, frame, frameData, motionValue } from 'framer-motion/dom'
import type { SpringOptions } from 'framer-motion'
import { isMotionValue } from '@/utils'

function toNumber(v: string | number) {
  if (typeof v === 'number')
    return v
  return parseFloat(v)
}

export function useSpring(
  source: MotionValue<string> | MotionValue<number> | number,
  config: SpringOptions | Ref<SpringOptions> = {},
) {
  let activeSpringAnimation: JSAnimation<number> | null = null
  const value = motionValue(
    isMotionValue(source) ? toNumber(source.get()) : source,
  )
  let latestValue = value.get()
  let latestSetter = () => {}

  const stopAnimation = () => {
    if (activeSpringAnimation) {
      activeSpringAnimation.stop()
      activeSpringAnimation = null
    }
  }

  const startAnimation = () => {
    const animation = activeSpringAnimation

    if (animation?.time === 0) {
      animation.sample(frameData.delta)
    }

    stopAnimation()

    const springConfig = unref(config)
    activeSpringAnimation = new JSAnimation({
      keyframes: [value.get(), latestValue],
      velocity: value.getVelocity(),
      type: 'spring',
      restDelta: 0.001,
      restSpeed: 0.01,
      ...springConfig,
      onUpdate: latestSetter,
    })
  }

  watch(() => {
    if (isRef(config)) {
      return (config as Ref<SpringOptions>).value
    }
    return config
  }, () => {
    (value as any).attach((v, set) => {
      latestValue = v
      latestSetter = set
      frame.update(startAnimation)
      return value.get()
    }, stopAnimation)
  }, { immediate: true })

  if (isMotionValue(source)) {
    source.on('change', (v) => {
      value.set(toNumber(v))
    })
  }

  return value
}
