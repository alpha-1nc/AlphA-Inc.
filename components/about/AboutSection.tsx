'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { OrgChart } from './OrgChart'

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#0A0A0A] px-6 py-32 md:px-20"
    >
      {/* Subtle grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage:
            'radial-gradient(ellipse at center, black 0%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 0%, transparent 75%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <motion.span
            variants={fadeUp}
            className="text-xs tracking-widest text-white/20"
          >
            ABOUT
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-4xl font-bold text-white"
          >
            1인 기업. 4개 본부.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/40"
          >
            AlphA Inc.는 1인이 운영하는 개인 운영체제입니다.
            <br />
            투자, 개발, 학습, 라이프스타일을 하나의 체계로 관리합니다.
          </motion.p>
        </motion.div>

        <div className="mt-20">
          <OrgChart />
        </div>
      </div>
    </section>
  )
}
