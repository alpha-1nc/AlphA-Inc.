'use client'

import { motion } from 'framer-motion'
import {
  Activity,
  LayoutDashboard,
  Server,
  type LucideIcon,
} from 'lucide-react'
import { fadeUp, staggerContainer } from '@/lib/animations'

interface VisionItem {
  icon: LucideIcon
  title: string
  description: string
}

const items: VisionItem[] = [
  {
    icon: Server,
    title: 'Cloud Engineering',
    description: '확장 가능한 시스템을 직접 설계하는 기술적 깊이.',
  },
  {
    icon: Activity,
    title: 'Infrastructure Operations',
    description: '모니터링, 장애 대응, 배포 절차를 홈서버에서 직접 운영하며 익히는 실전 감각.',
  },
  {
    icon: LayoutDashboard,
    title: 'Personal OS',
    description: '삶 전체를 운영체제처럼 설계하는 통합.',
  },
]

export function VisionSection() {
  return (
    <section id="vision" className="bg-[#0A0A0A] px-20 py-28">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.span
            variants={fadeUp}
            className="block text-xs tracking-widest text-alpha-gradient-dim"
          >
            VISION
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-3 text-4xl font-bold text-alpha-gradient"
          >
            하나의 삶을 시스템으로.
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-2 text-base text-alpha-gradient-faint">
            서비스가 멈추지 않는 인프라를 만든다.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {items.map((item) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-6"
              >
                <Icon
                  size={20}
                  strokeWidth={1.5}
                  className="text-gray-400"
                />
                <h3 className="mt-4 text-base font-semibold text-alpha-gradient">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-[#666]">{item.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
