'use client'

import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'

const AnimatedNavLink = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => {
  const defaultTextColor = 'text-gray-300'
  const hoverTextColor = 'text-white'
  const textSizeClass = 'text-sm'

  return (
    <a
      href={href}
      className={`group relative block h-5 overflow-hidden ${textSizeClass}`}
    >
      <div className="flex transform flex-col transition-transform duration-[400ms] ease-out group-hover:-translate-y-1/2">
        <span className={`block h-5 leading-5 ${defaultTextColor}`}>{children}</span>
        <span className={`block h-5 leading-5 ${hoverTextColor}`}>{children}</span>
      </div>
    </a>
  )
}

const navLinksData = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Vision', href: '#vision' },
]

const LAUNCH_HREF = 'https://holdings.alphaintlgroup.com'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [headerShapeClass, setHeaderShapeClass] = useState('rounded-full')
  const shapeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (shapeTimeoutRef.current) {
      clearTimeout(shapeTimeoutRef.current)
    }

    if (isOpen) {
      setHeaderShapeClass('rounded-xl')
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass('rounded-full')
      }, 300)
    }

    return () => {
      if (shapeTimeoutRef.current) {
        clearTimeout(shapeTimeoutRef.current)
      }
    }
  }, [isOpen])

  const logoElement = (
    <span className="relative block h-8 w-8 overflow-hidden rounded-[9px] bg-black">
      <Image
        src="/logo/AlphA%20AI%20Logo/AlphAInc_Logo.jpeg"
        alt="AlphA Inc. 로고"
        fill
        sizes="32px"
        className="scale-[1.18] object-cover"
        priority
      />
    </span>
  )

  const launchButtonElement = (
    <div className="group relative w-full sm:w-auto">
      <div className="pointer-events-none absolute inset-0 -m-2 hidden rounded-full bg-gray-100 opacity-40 blur-lg filter transition-all duration-300 ease-out group-hover:-m-3 group-hover:opacity-60 group-hover:blur-xl sm:block" />
      <a
        href={LAUNCH_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-300 px-4 py-2 text-xs font-semibold text-black transition-all duration-200 hover:from-gray-200 hover:to-gray-400 sm:w-auto sm:px-3 sm:text-sm"
      >
        Launch ↗
      </a>
    </div>
  )

  return (
    <header
      className={`fixed left-1/2 top-6 z-20 flex w-[calc(100%-2rem)] -translate-x-1/2 transform flex-col items-center border border-[#333] bg-[#1f1f1f57] py-3 pl-6 pr-6 backdrop-blur-sm transition-[border-radius] duration-0 ease-in-out sm:w-auto ${headerShapeClass}`}
    >
      <div className="flex w-full items-center justify-between gap-x-6 sm:gap-x-8">
        <div className="flex items-center">
          <a href="#" aria-label="AlphA Inc.">
            {logoElement}
          </a>
        </div>

        <nav className="hidden items-center space-x-4 text-sm sm:flex sm:space-x-6">
          {navLinksData.map((link) => (
            <AnimatedNavLink key={link.href} href={link.href}>
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        <div className="hidden items-center sm:flex">{launchButtonElement}</div>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center text-gray-300 focus:outline-none sm:hidden"
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
        >
          {isOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`flex w-full flex-col items-center overflow-hidden transition-all duration-300 ease-in-out sm:hidden ${
          isOpen
            ? 'max-h-[1000px] pt-4 opacity-100'
            : 'pointer-events-none max-h-0 pt-0 opacity-0'
        }`}
      >
        <nav className="flex w-full flex-col items-center space-y-4 text-base">
          {navLinksData.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="w-full text-center text-gray-300 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="mt-4 flex w-full flex-col items-center space-y-4">
          {launchButtonElement}
        </div>
      </div>
    </header>
  )
}
