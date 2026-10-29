'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Sparkles, Check, Send } from 'lucide-react'

interface GiftCard3DProps {
  onOrderCertificate?: (nominal: number) => void
}

export function GiftCard3D({ onOrderCertificate }: GiftCard3DProps) {
  const [selectedNominal, setSelectedNominal] = useState<number>(3000)
  const cardRef = useRef<HTMLDivElement>(null)

  // 3D Tilt State
  const [rotX, setRotX] = useState(0)
  const [rotY, setRotY] = useState(0)
  const [glare, setGlare] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left // 0 to width
    const y = e.clientY - rect.top // 0 to height

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Max rotation in degrees
    const maxRot = 16
    const rX = -((y - centerY) / centerY) * maxRot
    const rY = ((x - centerX) / centerX) * maxRot

    setRotX(rX)
    setRotY(rY)

    // Glare position in percent
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.8,
    })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotX(0)
    setRotY(0)
    setGlare((prev) => ({ ...prev, opacity: 0 }))
  }

  // Preset denominations
  const nominals = [2000, 3000, 5000, 8000]

  return (
    <div className="w-full flex flex-col items-center">
      {/* Interactive 3D Perspective Card Container */}
      <div
        className="w-full max-w-[460px] py-4"
        style={{ perspective: '1200px' }}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative w-full aspect-[1.586/1] rounded-[22px] sm:rounded-[26px] p-5 sm:p-7 select-none cursor-grab active:cursor-grabbing transition-transform duration-200 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${isHovered ? 1.04 : 1}, ${isHovered ? 1.04 : 1}, 1)`,
            boxShadow: isHovered
              ? '0 25px 60px -15px rgba(255, 85, 0, 0.45), 0 0 45px rgba(255, 85, 0, 0.35)'
              : '0 20px 45px -10px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 85, 0, 0.2)',
          }}
        >
          {/* Card Outer Glowing Border Rim */}
          <div className="absolute inset-0 rounded-[22px] sm:rounded-[26px] border border-orange-500/50 pointer-events-none z-30" />

          {/* Card Background: Matte Titanium Black + Brushed Vertical Lines */}
          <div
            className="absolute inset-0 rounded-[22px] sm:rounded-[26px] overflow-hidden z-0"
            style={{
              backgroundColor: '#10141D',
              backgroundImage: `
                repeating-linear-gradient(
                  90deg,
                  rgba(255, 255, 255, 0.015) 0px,
                  rgba(255, 255, 255, 0.015) 1px,
                  transparent 1px,
                  transparent 3px
                ),
                radial-gradient(circle at 50% 40%, #1A2232 0%, #0C1017 100%)
              `,
            }}
          >
            {/* Ambient Orange Neon Glow inside Card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-orange-500/20 rounded-full blur-[60px] pointer-events-none" />

            {/* Dynamic Specular Holographic Glare Follower */}
            <div
              className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
              style={{
                opacity: glare.opacity,
                background: `radial-gradient(circle 220px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 120, 0, 0.15) 30%, transparent 70%)`,
              }}
            />
          </div>

          {/* ================= CARD CONTENT LAYERS (Preserve-3D) ================= */}
          <div
            className="relative h-full flex flex-col justify-between z-10"
            style={{ transform: 'translateZ(30px)' }}
          >
            {/* TOP ROW: Realistic Gold EMV Chip + Top Right Watermark */}
            <div className="flex items-start justify-between">
              {/* Golden Chip */}
              <div
                className="relative"
                style={{ transform: 'translateZ(20px)' }}
              >
                <svg
                  viewBox="0 0 54 42"
                  className="w-11 sm:w-13 h-8 sm:h-9 rounded-md overflow-hidden shadow-md border border-amber-600/50"
                >
                  <defs>
                    <linearGradient id="goldChipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFE082" />
                      <stop offset="35%" stopColor="#FFC107" />
                      <stop offset="70%" stopColor="#FFA000" />
                      <stop offset="100%" stopColor="#FFD54F" />
                    </linearGradient>
                  </defs>
                  <rect width="54" height="42" rx="4" fill="url(#goldChipGrad)" />
                  {/* Micro-Circuit Contact Pads */}
                  <path
                    d="M 0,14 L 18,14 L 18,28 L 0,28 M 36,14 L 54,14 M 36,28 L 54,28 M 18,21 L 36,21 M 27,0 L 27,14 M 27,28 L 27,42 M 18,14 A 9,9 0 0,1 36,14 M 18,28 A 9,9 0 0,0 36,28"
                    fill="none"
                    stroke="#8D6200"
                    strokeWidth="1"
                    opacity="0.8"
                  />
                  <rect x="22" y="16" width="10" height="10" rx="1.5" fill="none" stroke="#8D6200" strokeWidth="0.8" opacity="0.7" />
                </svg>
              </div>

              {/* Watermark Logo */}
              <div
                className="text-right"
                style={{ transform: 'translateZ(15px)' }}
              >
                <span className="font-headline-xl text-lg sm:text-xl font-black text-white/40 tracking-widest uppercase">
                  KVADRO 1
                </span>
              </div>
            </div>

            {/* CENTER: Neon Glowing Quad Bike Emblem + Brand Badge */}
            <div
              className="flex flex-col items-center justify-center my-auto py-1"
              style={{ transform: 'translateZ(45px)' }}
            >
              {/* Neon Emblem */}
              <div className="relative flex items-center justify-center mb-1.5 sm:mb-2">
                {/* Neon Back Aura */}
                <div className="absolute w-28 h-12 bg-orange-500/40 rounded-full blur-xl animate-pulse" />

                {/* Stylized Quad Silhouette SVG with Double Neon Glow */}
                <svg
                  viewBox="0 0 110 52"
                  className="w-24 sm:w-28 h-12 sm:h-14 overflow-visible"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <filter id="neonOrangeGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Quad Bike Cyber Line-art */}
                  <g filter="url(#neonOrangeGlow)" stroke="#FF6B00" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                    {/* Front Wheel */}
                    <circle cx="24" cy="36" r="11" />
                    <circle cx="24" cy="36" r="4.5" fill="#FF8533" />
                    {/* Rear Wheel */}
                    <circle cx="86" cy="36" r="11" />
                    <circle cx="86" cy="36" r="4.5" fill="#FF8533" />
                    {/* Frame & Suspension */}
                    <path d="M24 36 L40 28 L70 28 L86 36" />
                    <path d="M40 28 L46 16 L66 16 L74 24" />
                    {/* Seat & Tank */}
                    <path d="M46 16 L54 11 L68 11 L74 20" />
                    {/* Handlebar */}
                    <path d="M46 16 L42 8 L36 9" />
                    {/* Bullbar */}
                    <path d="M24 32 L15 28 L17 22 L24 24" />
                  </g>

                  {/* Core Highlight Stroke for Authentic Neon Tube effect */}
                  <g stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">
                    <circle cx="24" cy="36" r="11" />
                    <circle cx="86" cy="36" r="11" />
                    <path d="M24 36 L40 28 L70 28 L86 36" />
                    <path d="M40 28 L46 16 L66 16 L74 24" />
                    <path d="M46 16 L54 11 L68 11 L74 20" />
                    <path d="M46 16 L42 8 L36 9" />
                  </g>
                </svg>
              </div>

              {/* Title & Subtitle */}
              <span className="font-headline-sm text-xs sm:text-sm font-black tracking-[0.25em] text-white uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                KVADRO GIFT CARD
              </span>
              <span className="font-label-caps text-[9px] sm:text-[10px] tracking-[0.18em] text-text-dim uppercase mt-0.5">
                EXCLUSIVE OFFROAD ADVENTURE &bull; KYIV
              </span>
            </div>

            {/* BOTTOM ROW: Cardholder on Left + Nominal on Right */}
            <div
              className="flex items-end justify-between pt-1"
              style={{ transform: 'translateZ(25px)' }}
            >
              {/* Bottom Left */}
              <div className="flex flex-col">
                <span className="font-label-caps text-[9px] sm:text-[10px] text-text-dim uppercase tracking-wider font-semibold">
                  Отримувач / Cardholder
                </span>
                <span className="font-headline-sm text-xs sm:text-sm font-bold text-text-primary capitalize leading-tight mt-0.5">
                  Для особливої людини
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] font-bold text-border-active uppercase tracking-tight mt-1 flex items-center gap-1">
                  <span>KVADROKYIV1.COM.UA</span>
                  <span className="text-white/40">&bull;</span>
                  <span className="text-emerald-400 font-extrabold">-10% LIFETIME</span>
                </span>
              </div>

              {/* Bottom Right: Nominal */}
              <div className="flex flex-col items-end">
                <span className="font-label-caps text-[9px] sm:text-[10px] text-text-dim uppercase tracking-wider font-semibold">
                  Номінал сертифіката
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-headline-xl text-xl sm:text-2xl font-black text-white tracking-tight">
                    {selectedNominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                  </span>
                  <span className="text-border-active font-black text-base sm:text-lg">
                    ₴
                  </span>
                </div>
                <span className="font-label-caps text-[9px] text-text-dim uppercase tracking-tight mt-1">
                  Valid in Ukraine &bull; 12 місяців
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Nominal Switcher Pills */}
      <div className="mt-4 flex flex-col items-center gap-3 w-full max-w-[460px]">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-panel border border-border-subtle w-full justify-between">
          {nominals.map((nom) => (
            <button
              key={nom}
              type="button"
              onClick={() => setSelectedNominal(nom)}
              className={`flex-1 py-2 px-2 rounded-lg text-xs font-headline-sm font-bold transition-all text-center ${
                selectedNominal === nom
                  ? 'bg-border-active text-white shadow-md shadow-border-active/20'
                  : 'text-text-muted hover:text-text-primary hover:bg-surface-base'
              }`}
            >
              {nom.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₴
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <button
          type="button"
          onClick={() => onOrderCertificate?.(selectedNominal)}
          className="w-full py-3.5 bg-border-active hover:bg-brand-amber text-white font-headline-sm text-sm uppercase font-bold rounded-xl ignition-glow shadow-lg shadow-border-active/20 flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Замовити цей сертифікат ({selectedNominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₴)</span>
        </button>

      </div>
    </div>
  )
}
