'use client'

import React from 'react'
import { MaterialIcon } from '@/components/ui/MaterialIcon'
import { defaultSettings } from '@/lib/defaultData'

interface MobileBottomBarProps {
  settings?: typeof defaultSettings
}

export function MobileBottomBar({ settings }: MobileBottomBarProps) {
  const currentSettings = settings || defaultSettings
  const scrollToBooking = (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById('booking')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-2 bg-[#1C2333]/95 backdrop-blur-md border-t border-[#252F45] shadow-2xl lg:hidden pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      {/* Tours */}
      <a
        href="#tours"
        className="flex flex-col items-center justify-center text-[#94A3B8] py-1 px-2 hover:text-[#FF3208] transition-colors active:scale-95"
      >
        <MaterialIcon className="text-xl">sports_motorsports</MaterialIcon>
        <span className="font-label-caps text-[10px] uppercase mt-0.5 tracking-wider font-semibold">Маршрути</span>
      </a>

      {/* Book (Active State Intent) */}
      <a
        href="#booking"
        onClick={scrollToBooking}
        className="flex flex-col items-center justify-center bg-[#FF3208] text-white rounded-lg py-1.5 px-4 font-bold shadow-md shadow-[#FF3208]/30 ignition-glow active:scale-95 transition-transform"
      >
        <MaterialIcon className="text-xl">calendar_today</MaterialIcon>
        <span className="font-label-caps text-[10px] uppercase mt-0.5 tracking-wider font-bold">Бронювання</span>
      </a>

      {/* Prices */}
      <a
        href="#prices"
        className="flex flex-col items-center justify-center text-[#94A3B8] py-1 px-2 hover:text-[#FF3208] transition-colors active:scale-95"
      >
        <MaterialIcon className="text-xl">payments</MaterialIcon>
        <span className="font-label-caps text-[10px] uppercase mt-0.5 tracking-wider font-semibold">Ціни</span>
      </a>

      {/* Contact / Call */}
      <a
        href={`tel:${currentSettings.phoneRaw}`}
        className="flex flex-col items-center justify-center text-[#94A3B8] py-1 px-2 hover:text-[#FF3208] transition-colors active:scale-95"
      >
        <MaterialIcon className="text-xl">call</MaterialIcon>
        <span className="font-label-caps text-[10px] uppercase mt-0.5 tracking-wider font-semibold">Контакти</span>
      </a>
    </nav>
  )
}

