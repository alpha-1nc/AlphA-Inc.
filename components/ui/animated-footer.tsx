'use client'

import Link from 'next/link'
import type React from 'react'
import { Triangle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FooterLink {
  label: string
  href: string
}

interface SocialLink {
  icon: React.ReactNode
  href: string
  label: string
}

interface FooterProps {
  brandName?: string
  brandDescription?: string
  socialLinks?: SocialLink[]
  navLinks?: FooterLink[]
  creatorName?: string
  creatorUrl?: string
  brandIcon?: React.ReactNode
  className?: string
}

export const Footer = ({
  brandName = 'YourBrand',
  brandDescription = 'Your description here',
  socialLinks = [],
  navLinks = [],
  creatorName,
  creatorUrl,
  brandIcon,
  className,
}: FooterProps) => {
  return (
    <section className={cn('relative mt-0 w-full overflow-hidden', className)}>
      <footer className="relative mt-20 border-t border-[#222] bg-[#0A0A0A]">
        <div className="relative mx-auto flex min-h-[30rem] max-w-7xl flex-col justify-between p-4 py-10 sm:min-h-[35rem] md:min-h-[40rem]">
          <div className="mb-12 flex w-full flex-col sm:mb-20 md:mb-0">
            <div className="flex w-full flex-col items-center">
              <div className="flex flex-1 flex-col items-center space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-alpha-gradient">
                    {brandName}
                  </span>
                </div>
                <p className="w-full max-w-sm px-4 text-center font-semibold text-[#888] sm:w-96 sm:px-0">
                  {brandDescription}
                </p>
              </div>

              {socialLinks.length > 0 && (
                <div className="mb-8 mt-3 flex gap-4">
                  {socialLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-[#888] transition-colors hover:text-gray-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="h-6 w-6 duration-300 hover:scale-110">
                        {link.icon}
                      </div>
                      <span className="sr-only">{link.label}</span>
                    </Link>
                  ))}
                </div>
              )}

              {navLinks.length > 0 && (
                <div className="flex max-w-full flex-wrap justify-center gap-4 px-4 text-sm font-medium text-[#888]">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      className="duration-300 hover:font-semibold hover:text-gray-200"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-20 flex flex-col items-center justify-center gap-2 px-4 md:mt-24 md:flex-row md:items-center md:justify-between md:gap-1 md:px-0">
            <p className="text-center text-base text-[#888] md:text-left">
              ©{new Date().getFullYear()} {brandName}. All rights reserved.
            </p>
            {creatorName && creatorUrl && (
              <nav className="flex gap-4">
                <Link
                  href={creatorUrl}
                  target="_blank"
                  className="text-base text-[#888] transition-colors duration-300 hover:font-medium hover:text-gray-200"
                >
                  Crafted by {creatorName}
                </Link>
              </nav>
            )}
          </div>
        </div>

        {/* Large background brand text */}
        <div
          className="pointer-events-none absolute bottom-40 left-1/2 -translate-x-1/2 select-none whitespace-nowrap bg-gradient-to-b from-white/20 via-white/10 to-transparent bg-clip-text px-4 text-center font-extrabold leading-none tracking-tighter text-transparent md:bottom-32"
          style={{
            fontSize: 'clamp(2.5rem, 10vw, 8rem)',
            maxWidth: '95vw',
          }}
        >
          {brandName.toUpperCase()}
        </div>

        {/* Bottom logo medallion */}
        <div className="duration-400 absolute bottom-24 left-1/2 z-10 flex -translate-x-1/2 items-center justify-center rounded-3xl border-2 border-[#222] bg-[#0A0A0A]/60 p-3 backdrop-blur-sm drop-shadow-[0_0px_20px_rgba(0,0,0,0.5)] hover:border-white dark:drop-shadow-[0_0px_20px_rgba(255,255,255,0.3)] md:bottom-20">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-white to-white/80 shadow-lg sm:h-16 sm:w-16 md:h-24 md:w-24">
            {brandIcon || (
              <Triangle
                size={40}
                strokeWidth={1.5}
                className="text-[#0A0A0A] drop-shadow-lg"
              />
            )}
          </div>
        </div>

        {/* Bottom line */}
        <div className="sm:bottom-34 absolute bottom-32 left-1/2 h-1 w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-[#222] to-transparent backdrop-blur-sm" />

        {/* Bottom shadow */}
        <div className="absolute bottom-28 h-24 w-full bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]/40 blur-[1em]" />
      </footer>
    </section>
  )
}
