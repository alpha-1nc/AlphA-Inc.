'use client'

import { motion } from 'framer-motion'
import { ClipPathLinks } from '@/components/ui/clip-path-links'

export function FooterLinks() {
  return (
    <section className="border-t border-[#1a1a1a] bg-[#050505] px-20 pt-12">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-2xl border border-[#222]"
        >
          <ClipPathLinks />
        </motion.div>
      </div>
    </section>
  )
}
