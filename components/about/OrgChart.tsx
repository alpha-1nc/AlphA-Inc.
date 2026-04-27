'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
  Compass,
  Cpu,
  Landmark,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface ServiceNode {
  name: string
  status: 'live' | 'dev'
}

interface DivisionNode {
  icon: LucideIcon
  name: string
  services: ServiceNode[]
}

const divisions: DivisionNode[] = [
  {
    icon: Compass,
    name: '비전전략본부',
    services: [],
  },
  {
    icon: Cpu,
    name: '엔지니어링본부',
    services: [
      { name: 'AlphA AI', status: 'dev' },
      { name: 'AlphA Cloud', status: 'dev' },
      { name: 'AlphA Radar', status: 'dev' },
      { name: 'AlphA Automator', status: 'dev' },
    ],
  },
  {
    icon: Landmark,
    name: '자산운용본부',
    services: [
      { name: 'AlphA Bank', status: 'live' },
      { name: 'AlphA Holdings', status: 'live' },
    ],
  },
  {
    icon: Sparkles,
    name: 'QoL본부',
    services: [{ name: 'AlphA Travel', status: 'dev' }],
  },
]

const lineBase = {
  stroke: 'rgba(255,255,255,0.08)',
  strokeWidth: 1,
  fill: 'none',
  strokeDasharray: '4 4',
} as const

export function OrgChart() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="relative mx-auto w-full max-w-5xl">
      {/* Root node */}
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="group relative flex items-center gap-3 rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-lg font-bold text-white transition-shadow duration-300"
          style={{
            boxShadow:
              '0 0 0 1px rgba(255,255,255,0.05), 0 0 30px rgba(255,255,255,0.03)',
          }}
        >
          <span
            className="relative inline-flex h-[22px] w-[22px] shrink-0 overflow-hidden rounded-[28%] bg-[#0A0A0A]"
            aria-hidden
          >
            <Image
              src="/alpha-logo.png"
              alt=""
              width={48}
              height={48}
              className="h-full w-full scale-[1.16] object-cover object-center"
              sizes="22px"
            />
          </span>
          AlphA Inc.
        </motion.div>
      </div>

      {/* SVG connection lines (desktop only) */}
      <svg
        aria-hidden
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
        className="pointer-events-none absolute left-0 right-0 top-[68px] hidden h-[72px] w-full md:block"
      >
        {/* Root → trunk */}
        <motion.path
          d="M 50 0 V 30"
          {...lineBase}
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        />
        {/* Horizontal trunk */}
        <motion.path
          d="M 12.5 30 H 87.5"
          {...lineBase}
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
        />
        {/* Trunk → each division */}
        {[12.5, 37.5, 62.5, 87.5].map((x, i) => (
          <motion.path
            key={x}
            d={`M ${x} 30 V 60`}
            {...lineBase}
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.4,
              delay: 1.0 + i * 0.05,
              ease: 'easeOut',
            }}
          />
        ))}
      </svg>

      {/* Spacer for SVG (desktop) */}
      <div className="hidden h-[72px] md:block" />

      {/* Mobile spacer */}
      <div className="h-12 md:hidden" />

      {/* Divisions */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
        }}
        className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
      >
        {divisions.map((division, i) => {
          const Icon = division.icon
          const isHovered = hovered === i
          const hasServices = division.services.length > 0

          return (
            <motion.div
              key={division.name}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="flex flex-col items-center"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className={`group flex w-full max-w-52 cursor-pointer flex-col items-start rounded-xl border bg-white/[0.03] p-5 transition-all duration-300 ${
                  isHovered
                    ? 'scale-[1.03] border-white/30 bg-white/[0.07]'
                    : 'border-white/10'
                }`}
              >
                <Icon
                  size={18}
                  strokeWidth={1.5}
                  className={`transition-colors duration-300 ${
                    isHovered ? 'text-white/90' : 'text-white/50'
                  }`}
                />
                <span className="mt-2 text-sm font-semibold text-white/80">
                  {division.name}
                </span>
              </div>

              {/* Sub-services */}
              <AnimatePresence>
                {isHovered && hasServices && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="overflow-hidden px-2 pb-1"
                  >
                    {/* Connector line */}
                    <div className="mx-auto h-4 w-px bg-white/15" />
                    <motion.ul
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.05 } },
                      }}
                      className="flex w-full max-w-52 flex-col items-stretch gap-2 pt-1"
                    >
                      {division.services.map((service) => (
                        <motion.li
                          key={service.name}
                          variants={{
                            hidden: { opacity: 0, y: -4 },
                            visible: { opacity: 1, y: 0 },
                          }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/50 transition-all duration-200 hover:border-white/30 hover:bg-white/5 hover:text-white/80 md:justify-start"
                        >
                          <span
                            className="relative flex h-4 w-4 shrink-0 items-center justify-center"
                            aria-hidden
                          >
                            <span
                              className="pointer-events-none absolute h-3.5 w-3.5 rounded-full bg-gray-100 motion-safe:animate-[launch-dot-halo_2.2s_ease-in-out_infinite]"
                            />
                            <span className="relative z-10 h-1.5 w-1.5 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 shadow-sm ring-1 ring-white/25" />
                          </span>
                          {service.name}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
