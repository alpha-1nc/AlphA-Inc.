'use client'

import { useAnimate } from 'framer-motion'
import type React from 'react'
import {
  SiCloudflare,
  SiDocker,
  SiGithub,
  SiNextdotjs,
  SiSqlite,
  SiTelegram,
  SiUbuntu,
  SiUptimekuma,
} from 'react-icons/si'

const NO_CLIP = 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'
const BOTTOM_RIGHT_CLIP = 'polygon(0 0, 100% 0, 0 0, 0% 100%)'
const TOP_RIGHT_CLIP = 'polygon(0 0, 0 100%, 100% 100%, 0% 100%)'
const BOTTOM_LEFT_CLIP = 'polygon(100% 100%, 100% 0, 100% 100%, 0 100%)'
const TOP_LEFT_CLIP = 'polygon(0 0, 100% 0, 100% 100%, 100% 0)'

type Side = 'left' | 'right' | 'top' | 'bottom'

const ENTRANCE_KEYFRAMES: Record<Side, string[]> = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
}

const EXIT_KEYFRAMES: Record<Side, string[]> = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
}

type IconComponent = React.ComponentType<{ className?: string }>

interface LinkBoxProps {
  href: string
  Icon?: IconComponent
  imgSrc?: string
  className?: string
  ariaLabel: string
  customContent?: React.ReactNode
}

function LinkBox({
  Icon,
  href,
  imgSrc,
  className,
  ariaLabel,
  customContent,
}: LinkBoxProps) {
  const [scope, animate] = useAnimate()

  const getNearestSide = (e: React.MouseEvent<HTMLAnchorElement>): Side => {
    const box = e.currentTarget.getBoundingClientRect()
    const proximities: Array<{ side: Side; proximity: number }> = [
      { side: 'left', proximity: Math.abs(box.left - e.clientX) },
      { side: 'right', proximity: Math.abs(box.right - e.clientX) },
      { side: 'top', proximity: Math.abs(box.top - e.clientY) },
      { side: 'bottom', proximity: Math.abs(box.bottom - e.clientY) },
    ]
    proximities.sort((a, b) => a.proximity - b.proximity)
    return proximities[0].side
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const side = getNearestSide(e)
    animate(scope.current, { clipPath: ENTRANCE_KEYFRAMES[side] })
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const side = getNearestSide(e)
    animate(scope.current, { clipPath: EXIT_KEYFRAMES[side] })
  }

  const renderInner = () => {
    if (customContent) {
      return customContent
    }
    if (imgSrc) {
      return (
        <img
          src={imgSrc}
          alt=""
          className={className ?? 'max-h-10 object-contain sm:max-h-16 md:max-h-20'}
        />
      )
    }
    if (Icon) {
      return <Icon className="text-xl sm:text-3xl md:text-4xl" />
    }
    return null
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative grid h-20 w-full place-content-center bg-[#0A0A0A] text-[#666] sm:h-28 md:h-36"
    >
      {renderInner()}
      <div
        ref={scope}
        style={{ clipPath: BOTTOM_RIGHT_CLIP, background: '#ffffff' }}
        className="absolute inset-0 grid place-content-center text-black"
      >
        {renderInner()}
      </div>
    </a>
  )
}

export function ClipPathLinks() {
  return (
    <div className="divide-y divide-[#222]">
      <div className="grid grid-cols-2 divide-x divide-[#222]">
        <LinkBox Icon={SiGithub} href="https://github.com/alpha-1nc/alpha-infra" ariaLabel="GitHub alpha-infra" />
        <LinkBox Icon={SiUbuntu} href="https://ubuntu.com" ariaLabel="Ubuntu" />
      </div>
      <div className="grid grid-cols-4 divide-x divide-[#222]">
        <LinkBox Icon={SiDocker} href="https://www.docker.com" ariaLabel="Docker" />
        <LinkBox Icon={SiCloudflare} href="https://www.cloudflare.com" ariaLabel="Cloudflare" />
        <LinkBox Icon={SiUptimekuma} href="https://uptime.kuma.pet" ariaLabel="Uptime Kuma" />
        <LinkBox Icon={SiTelegram} href="https://telegram.org" ariaLabel="Telegram" />
      </div>
      <div className="grid grid-cols-3 divide-x divide-[#222]">
        <LinkBox Icon={SiNextdotjs} href="https://nextjs.org" ariaLabel="Next.js" />
        <LinkBox Icon={SiSqlite} href="https://sqlite.org" ariaLabel="SQLite" />
        <LinkBox
          href="https://alphaintlgroup.com"
          ariaLabel="AlphA Inc."
          customContent={
            <span className="relative block h-7 w-7 overflow-hidden rounded-[8px] sm:h-10 sm:w-10 md:h-12 md:w-12">
              <img
                src="/alpha-logo.png"
                alt=""
                className="absolute inset-0 h-full w-full scale-[1.18] object-cover"
              />
            </span>
          }
        />
      </div>
    </div>
  )
}
