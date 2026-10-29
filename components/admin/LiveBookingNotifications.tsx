'use client'

import React, { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'

interface BookingNotification {
  id: string | number
  clientName: string
  clientPhone: string
  vehicleType: string
  duration: string
  calculatedTotal: number
  bookingType: string
  createdAt: string
}

export function LiveBookingNotifications() {
  const pathname = usePathname()
  const isLoginPage = Boolean(
    pathname && (
      pathname.includes('/login') ||
      pathname.includes('/logout') ||
      pathname.includes('/create-first-user')
    )
  )

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [newCount, setNewCount] = useState<number>(0)
  const [bookingsList, setBookingsList] = useState<BookingNotification[]>([])
  const [activeToast, setActiveToast] = useState<BookingNotification | null>(null)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const seenIdsRef = useRef<Set<string | number>>(new Set())
  const isInitialLoadRef = useRef<boolean>(true)
  const isMutedRef = useRef<boolean>(false)
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize sound mute preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMute = localStorage.getItem('kvadro_admin_muted')
      if (savedMute === 'true') {
        setIsMuted(true)
        isMutedRef.current = true
      }
    }
  }, [])

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Web Audio synthesizer chime (pleasant two-tone crystal doorbell chime)
  const playChime = () => {
    if (isMutedRef.current) return
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()

      // Tone 1: 587.33 Hz (D5)
      const osc1 = ctx.createOscillator()
      const gain1 = ctx.createGain()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(587.33, ctx.currentTime)
      gain1.gain.setValueAtTime(0.18, ctx.currentTime)
      gain1.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6)
      osc1.connect(gain1)
      gain1.connect(ctx.destination)
      osc1.start(ctx.currentTime)
      osc1.stop(ctx.currentTime + 0.6)

      // Tone 2: 880 Hz (A5)
      const osc2 = ctx.createOscillator()
      const gain2 = ctx.createGain()
      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(880, ctx.currentTime + 0.12)
      gain2.gain.setValueAtTime(0.22, ctx.currentTime + 0.12)
      gain2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8)
      osc2.connect(gain2)
      gain2.connect(ctx.destination)
      osc2.start(ctx.currentTime + 0.12)
      osc2.stop(ctx.currentTime + 0.8)

      // Close AudioContext after chime completes to prevent browser AudioContext limit exhaustion
      setTimeout(() => {
        if (ctx.state !== 'closed') {
          ctx.close().catch(() => {})
        }
      }, 1000)
    } catch (e) {
      console.warn('AudioContext notice:', e)
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    const nextState = !isMuted
    setIsMuted(nextState)
    isMutedRef.current = nextState
    if (typeof window !== 'undefined') {
      localStorage.setItem('kvadro_admin_muted', String(nextState))
    }
  }

  // Polling loop every 10 seconds
  useEffect(() => {
    let isMounted = true

    const checkNotifications = async () => {
      if (isLoginPage) {
        if (isMounted) setIsAuthenticated(false)
        return
      }

      try {
        const res = await fetch('/api/admin/notifications', { cache: 'no-store' })
        if (res.status === 401 || !res.ok) {
          if (isMounted) {
            setIsAuthenticated(false)
            setNewCount(0)
            setBookingsList([])
          }
          return
        }

        const data = await res.json()
        if (!isMounted) return

        if (!data.authenticated) {
          setIsAuthenticated(false)
          setNewCount(0)
          setBookingsList([])
          return
        }

        setIsAuthenticated(true)
        const count: number = data.count || 0
        const bookings: BookingNotification[] = data.bookings || []
        setNewCount(count)
        setBookingsList(bookings)

        if (isInitialLoadRef.current) {
          // Record existing IDs without beeping on first page load
          bookings.forEach((b) => seenIdsRef.current.add(b.id))
          isInitialLoadRef.current = false
          return
        }

        // Detect newly arrived bookings
        const fresh = bookings.filter((b) => !seenIdsRef.current.has(b.id))
        if (fresh.length > 0) {
          playChime()

          const newest = fresh[0]
          setActiveToast(newest)

          // Auto-hide toast after 9 seconds
          if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
          toastTimeoutRef.current = setTimeout(() => {
            setActiveToast(null)
          }, 9000)

          fresh.forEach((b) => seenIdsRef.current.add(b.id))
        }
      } catch {
        // Silently ignore network hiccups
      }
    }

    checkNotifications()
    const interval = setInterval(checkNotifications, 10000)

    return () => {
      isMounted = false
      clearInterval(interval)
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    }
  }, [isLoginPage])

  // Completely invisible when logged out or on the login page
  if (isLoginPage || !isAuthenticated) {
    return null
  }

  return (
    <div
      ref={dropdownRef}
      className="fixed top-3.5 right-5 z-[9999] font-sans flex flex-col items-end gap-2.5 pointer-events-none select-none"
    >
      {/* 1. Real-time Toast Card (Appears only when a fresh booking arrives) */}
      {activeToast && (
        <div className="pointer-events-auto w-80 sm:w-96 bg-[#121622]/95 text-white border border-[#F26522]/70 rounded-2xl p-4 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-3 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F26522]" />
              <span className="font-bold text-xs uppercase tracking-wider text-[#F26522]">
                Нова заявка на прокат!
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveToast(null)}
              className="text-white/50 hover:text-white text-sm p-1 leading-none cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="py-2.5 space-y-1.5 text-xs">
            <div className="flex justify-between items-baseline">
              <span className="text-white/60">Клієнт:</span>
              <span className="font-bold text-white text-sm">{activeToast.clientName}</span>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="text-white/60">Телефон:</span>
              <a
                href={`tel:${activeToast.clientPhone.replace(/\D/g, '')}`}
                className="font-mono font-bold text-[#F26522] hover:underline"
              >
                {activeToast.clientPhone}
              </a>
            </div>

            <div className="flex justify-between items-baseline pt-1">
              <span className="text-white/60">Техніка:</span>
              <span className="font-semibold text-white">{activeToast.vehicleType}</span>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="text-white/60">Тривалість:</span>
              <span className="font-medium text-white">{activeToast.duration}</span>
            </div>

            {activeToast.calculatedTotal > 0 && (
              <div className="flex justify-between items-baseline pt-1 border-t border-white/10">
                <span className="text-white/60">Сума:</span>
                <span className="font-bold text-emerald-400 text-sm">
                  {activeToast.calculatedTotal.toLocaleString('uk-UA')} ₴
                </span>
              </div>
            )}
          </div>

          <div className="pt-2 flex items-center gap-2">
            <a
              href={`/admin/collections/bookings/${activeToast.id}`}
              className="flex-1 py-2 px-3 bg-[#F26522] hover:bg-[#ff7733] text-white text-xs font-bold uppercase tracking-wider text-center rounded-xl transition-all shadow-md shadow-[#F26522]/20 cursor-pointer block"
            >
              Відкрити заявку →
            </a>
            <button
              type="button"
              onClick={() => setActiveToast(null)}
              className="py-2 px-3 bg-white/10 hover:bg-white/15 text-white/80 text-xs rounded-xl transition-colors cursor-pointer"
            >
              Закрити
            </button>
          </div>
        </div>
      )}

      {/* 2. Sleek Compact Notification Bell Icon */}
      <div className="pointer-events-auto relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`h-9 px-3 rounded-full flex items-center gap-2 transition-all shadow-md border backdrop-blur-md cursor-pointer ${
            newCount > 0
              ? 'bg-[#161C28]/95 border-[#F26522]/40 text-white hover:border-[#F26522]'
              : 'bg-[#10141E]/80 border-white/10 text-white/60 hover:text-white hover:border-white/20'
          }`}
          title="Сповіщення про бронювання"
        >
          {/* Bell SVG */}
          <svg
            className={`w-4 h-4 ${newCount > 0 ? 'text-[#F26522]' : 'text-white/50'}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>

          {newCount > 0 ? (
            <span className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F26522]" />
              <span>{newCount}</span>
            </span>
          ) : (
            <span className="text-[11px] text-white/50 font-medium hidden sm:inline">0</span>
          )}
        </button>

        {/* 3. Popover Dropdown Menu (Opened when Bell is clicked) */}
        {isOpen && (
          <div className="absolute top-11 right-0 w-80 sm:w-88 bg-[#121622]/98 border border-white/15 rounded-2xl shadow-2xl backdrop-blur-xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Нові заявки ({newCount})
                </span>
              </div>
              <button
                type="button"
                onClick={toggleMute}
                className="text-[11px] px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                title={isMuted ? 'Увімкнути звук' : 'Вимкнути звук'}
              >
                <span>{isMuted ? '🔇 Звук вимк' : '🔔 Звук увімк'}</span>
              </button>
            </div>

            {/* List */}
            {bookingsList.length > 0 ? (
              <div className="space-y-1.5 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 pr-1">
                {bookingsList.map((b) => (
                  <a
                    key={b.id}
                    href={`/admin/collections/bookings/${b.id}`}
                    className="block p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#F26522]/40 transition-all text-xs"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-white">{b.clientName}</span>
                      {b.calculatedTotal > 0 && (
                        <span className="font-bold text-emerald-400">
                          {b.calculatedTotal.toLocaleString('uk-UA')} ₴
                        </span>
                      )}
                    </div>
                    <div className="text-[#F26522] font-mono text-[11px] mt-0.5">
                      {b.clientPhone}
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-white/50 mt-1 pt-1 border-t border-white/5">
                      <span>{b.vehicleType}</span>
                      <span>{b.duration}</span>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-white/50">
                ✨ Усі заявки оброблено, нових немає!
              </div>
            )}

            {/* Footer action */}
            <div className="pt-2.5 mt-2 border-t border-white/10">
              <a
                href="/admin/collections/bookings?where[status][equals]=new"
                className="w-full py-2 bg-white/5 hover:bg-[#F26522] text-white text-xs font-bold uppercase tracking-wider text-center rounded-xl transition-all block cursor-pointer"
              >
                Усі нові заявки в таблиці →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
