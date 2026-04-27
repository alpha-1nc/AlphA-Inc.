'use client'

import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  BarChart2,
  Bot,
  Cloud,
  Landmark,
  type LucideIcon,
} from 'lucide-react'
import { TiltCard } from '@/components/ui/tilt-card'
import { fadeUp, staggerContainer } from '@/lib/animations'

interface ServiceItem {
  icon: LucideIcon
  title: string
  description: string
  href?: string
  comingSoon?: boolean
}

const services: ServiceItem[] = [
  {
    icon: BarChart2,
    title: 'AlphA Holdings',
    description:
      '글로벌 투자 포트폴리오 관리 시스템. 미국·일본·한국 직투, ISA, 연금저축을 한 곳에서.',
    href: 'https://holdings.alphaintlgroup.com',
  },
  {
    icon: Landmark,
    title: 'AlphA Bank',
    description: '현금흐름 & 예산 관리 시스템. 수입, 지출, 저축을 통합 관리.',
    href: 'https://bank.alphaintlgroup.com',
  },
  {
    icon: Bot,
    title: 'AlphA AI',
    description: 'AI 비서 & 자동화 에이전트. CEO의 일정, 의사결정, 분석을 지원.',
    comingSoon: true,
  },
  {
    icon: Cloud,
    title: 'smoo',
    description: '20대를 위한 Life OS. 캘린더, 루틴, 자산, 목표를 하나로.',
    comingSoon: true,
  },
]

function ServiceCard({ service }: { service: ServiceItem }) {
  const Icon = service.icon
  const isClickable = !service.comingSoon && service.href

  return (
    <TiltCard
      tiltLimit={8}
      scale={1.03}
      spotlight
      className="h-full rounded-2xl border border-[#222] bg-[#111] p-8"
    >
      <div className="relative z-20 flex h-full flex-col">
        <div className="mb-6 flex items-center justify-between">
          <Icon size={24} className="text-gray-400" strokeWidth={1.5} />
          {service.comingSoon && (
            <span className="rounded-full bg-[#222] px-3 py-1 text-xs text-[#555]">
              Coming Soon
            </span>
          )}
        </div>

        <h3 className="text-xl font-semibold text-alpha-gradient">{service.title}</h3>

        <p className="mt-3 text-sm leading-relaxed text-[#888]">
          {service.description}
        </p>

        {isClickable && (
          <a
            href={service.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-alpha-gradient-faint transition-all duration-300 hover:border-white/30 hover:bg-white/5 hover:text-gray-200"
          >
            <span>바로가기</span>
            <ArrowUpRight
              size={12}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        )}
      </div>
    </TiltCard>
  )
}

export function ServicesSection() {
  return (
    <section id="services" className="bg-[#0A0A0A] px-20 pb-28 pt-32">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.span
            variants={fadeUp}
            className="block text-xs tracking-widest text-[#555]"
          >
            SERVICES
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-3 text-4xl font-bold text-alpha-gradient"
          >
            하나의 시스템, 네 개의 엔진.
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-2 text-base text-[#666]">
            투자, 자산, AI — 모든 것이 연결됩니다.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={fadeUp}>
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
