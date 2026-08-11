import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delaySeconds: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: delaySeconds,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

type RevealProps = {
  children: ReactNode
  className?: string
  /** Stagger index for sequential reveals (multiplied by 80ms) */
  index?: number
  /** Explicit delay in seconds. Takes precedence over `index`. */
  delay?: number
  as?: 'div' | 'li' | 'section' | 'article'
}

export function Reveal({ children, className, index = 0, delay, as = 'div' }: RevealProps) {
  const MotionTag = motion[as]
  const delaySeconds = delay ?? index * 0.08

  return (
    <MotionTag
      className={className}
      custom={delaySeconds}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </MotionTag>
  )
}
