'use client'

import { useAnimate } from 'framer-motion'
import type React from 'react'
import {
  SiCloudflare,
  SiFacebook,
  SiGithub,
  SiGoogle,
  SiInstagram,
  SiX,
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
        <LinkBox Icon={SiGoogle} href="https://mail.google.com" ariaLabel="Google" />
        <LinkBox Icon={SiGithub} href="https://github.com" ariaLabel="GitHub" />
      </div>
      <div className="grid grid-cols-4 divide-x divide-[#222]">
        <LinkBox Icon={SiInstagram} href="https://instagram.com" ariaLabel="Instagram" />
        <LinkBox Icon={SiFacebook} href="https://facebook.com" ariaLabel="Facebook" />
        <LinkBox
          href="https://21st.dev"
          imgSrc="https://media.licdn.com/dms/image/v2/D4E0BAQH3Jqtih4t7-A/company-logo_200_200/B4EZY_fSK1HUAM-/0/1744821888382/21st_dev_logo?e=2147483647&v=beta&t=8hoDRfmpNQR3aqnKWef5U0bW9Mg2GCbgwvgeQ5MKaKU"
          className="h-6 w-auto object-contain"
          ariaLabel="21st.dev"
        />
        <LinkBox Icon={SiCloudflare} href="https://cloudflare.com" ariaLabel="Cloudflare" />
      </div>
      <div className="grid grid-cols-3 divide-x divide-[#222]">
        <LinkBox Icon={SiX} href="https://x.com" ariaLabel="X" />
        <LinkBox
          href="https://claude.ai"
          ariaLabel="Claude"
          customContent={
            <span
              aria-hidden="true"
              className="block h-5 w-5 bg-current sm:h-7 sm:w-7 md:h-9 md:w-9"
              style={{
                WebkitMaskImage: 'url(/icons8-claude.svg)',
                maskImage: 'url(/icons8-claude.svg)',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
              }}
            />
          }
        />
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
