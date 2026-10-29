'use client'

import React, { useState } from 'react'
import { SiteData } from '@/lib/getSiteData'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { StepsSection } from '@/components/StepsSection'
import { FleetPricing } from '@/components/FleetPricing'
import { BookingCalculator } from '@/components/BookingCalculator'
import { OneClickModal } from '@/components/OneClickModal'
import { RoutesGallery } from '@/components/RoutesGallery'
import { CertificatesSection } from '@/components/CertificatesSection'
import { LocationSection } from '@/components/LocationSection'
import { ReviewsSection } from '@/components/ReviewsSection'
import { FaqSection } from '@/components/FaqSection'
import { Footer } from '@/components/Footer'
import { MobileBottomBar } from '@/components/MobileBottomBar'
import { LegalModal, LegalModalType } from '@/components/LegalModal'
import { ContactsModal } from '@/components/ContactsModal'

interface HomePageClientProps {
  data: SiteData
}

export function HomePageClient({ data }: HomePageClientProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<string>(
    data.fleet[0]?.title || 'Квадро прогулянка'
  )
  const [isOneClickOpen, setIsOneClickOpen] = useState(false)
  const [oneClickVehicle, setOneClickVehicle] = useState<string>(
    data.fleet[0]?.title || 'Квадро прогулянка'
  )
  const [legalModalType, setLegalModalType] = useState<LegalModalType | null>(null)
  const [isContactsOpen, setIsContactsOpen] = useState(false)

  const handleOpenOneClick = (vehicleTitle?: string) => {
    setOneClickVehicle(vehicleTitle || selectedVehicle)
    setIsOneClickOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-100 flex flex-col font-sans">
      {/* Top Fixed Header */}
      <Navbar
        settings={data.settings}
        onOpenContacts={() => setIsContactsOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Hero Showcase */}
        <Hero settings={data.settings} />

        {/* 2. Step-by-Step Experience */}
        <StepsSection steps={data.steps} />

        {/* 3. Fleet & Pricing Matrix */}
        <FleetPricing
          fleet={data.fleet}
          settings={data.settings}
          onSelectVehicle={setSelectedVehicle}
          onOpenOneClick={handleOpenOneClick}
        />

        {/* 4. Interactive Live Booking Calculator */}
        <BookingCalculator
          fleet={data.fleet}
          settings={data.settings}
          initialVehicle={selectedVehicle}
          onOpenOneClick={handleOpenOneClick}
        />

        {/* 5. Routes & Rider Gallery */}
        <RoutesGallery routes={data.routes} settings={data.settings} />

        {/* 6. Gift Certificates & -10% Lifetime Card */}
        <CertificatesSection
          fleet={data.fleet}
          settings={data.settings}
          onOpenOneClick={handleOpenOneClick}
        />

        {/* 7. Location (Bortnychi) & Google Maps */}
        <LocationSection settings={data.settings} />

        {/* 8. Client Reviews */}
        <ReviewsSection reviews={data.reviews} />

        {/* 9. FAQ & Safety Guide */}
        <FaqSection faqs={data.faqs} />
      </main>

      {/* Footer */}
      <Footer
        settings={data.settings}
        onOpenSafety={() => setLegalModalType('safety')}
        onOpenOffer={() => setLegalModalType('offer')}
      />

      {/* Mobile-Only Bottom App Bar */}
      <MobileBottomBar
        settings={data.settings}
        onOpenContacts={() => setIsContactsOpen(true)}
      />

      {/* Contacts & Map Modal Popup */}
      <ContactsModal
        isOpen={isContactsOpen}
        onClose={() => setIsContactsOpen(false)}
        settings={data.settings}
        onOpenOneClick={() => handleOpenOneClick(selectedVehicle)}
      />

      {/* Fast 1-Click Booking Modal Popup */}
      <OneClickModal
        isOpen={isOneClickOpen}
        onClose={() => setIsOneClickOpen(false)}
        initialVehicle={oneClickVehicle}
        settings={data.settings}
      />

      {/* Legal Popups: Safety Rules & Public Offer */}
      <LegalModal
        isOpen={legalModalType !== null}
        onClose={() => setLegalModalType(null)}
        initialType={legalModalType || 'safety'}
        onOpenBooking={() => {
          setLegalModalType(null)
          handleOpenOneClick(selectedVehicle)
        }}
        settings={data.settings}
      />
    </div>
  )
}
