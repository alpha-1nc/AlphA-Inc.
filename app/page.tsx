import { Navbar } from '@/components/nav/Navbar'
import { Hero } from '@/components/sections/Hero'
import { ServicesSection } from '@/components/services/ServicesSection'
import { AboutSection } from '@/components/about/AboutSection'
import { VisionSection } from '@/components/vision/VisionSection'
import { FooterLinks } from '@/components/footer/FooterLinks'
import AlphaFooter from '@/components/footer/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-gray-200">
      <Navbar />
      <Hero />
      <div className="mx-20 border-t border-[#1a1a1a]" />
      <ServicesSection />
      <div className="mx-20 border-t border-[#1a1a1a]" />
      <AboutSection />
      <div className="mx-20 border-t border-[#1a1a1a]" />
      <VisionSection />
      <FooterLinks />
      <AlphaFooter />
    </main>
  )
}
