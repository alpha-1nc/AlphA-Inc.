'use client'

import { motion } from 'framer-motion'
import { SplineScene } from '@/components/ui/splite'
import { LiquidMetalButton } from '@/components/ui/liquid-metal-button'
import { fadeUp, staggerContainer } from '@/lib/animations'

export function Hero() {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#0A0A0A] pt-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-6 md:flex-row md:gap-12 md:px-16 lg:px-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex w-full flex-col justify-center md:w-1/2"
        >
          <motion.span
            variants={fadeUp}
            className="mb-6 inline-flex w-fit items-center rounded-full border border-[#333] px-4 py-1.5 text-xs text-[#888]"
          >
            Personal Operating System
          </motion.span>

          <motion.div variants={fadeUp} className="relative w-fit">
            <h1 className="relative whitespace-nowrap text-[80px] font-bold leading-none tracking-tight text-alpha-gradient">
              AlphA Inc.
            </h1>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-6 text-[20px] leading-snug text-[#666]">
            Code the Future.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex items-center gap-6">
            <LiquidMetalButton label="Services 보기" onClick={scrollToServices} />
            <a
              href="https://github.com/alpha-1nc/alpha-infra"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#666] underline underline-offset-4 transition-colors hover:text-[#999]"
            >
              GitHub →
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative flex h-[640px] w-full items-center justify-center md:h-[680px] md:w-1/2"
        >
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="h-full w-full"
          />
        </motion.div>
      </div>
    </section>
  )
}
