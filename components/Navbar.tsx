'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Send, MapPin } from 'lucide-react'
import { defaultSettings } from '@/lib/defaultData'

export function Navbar({ settings }: { settings?: typeof defaultSettings }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const s = settings || defaultSettings

  return (
    <>
      {/* Mobile Top App Bar (< lg) */}
      <header className="lg:hidden bg-surface-panel-elevated sticky top-0 z-50 shadow-md border-b border-border-subtle">
        <div className="flex items-center justify-between px-4 py-2.5 w-full">
          {/* Menu Button & Brand */}
          <div className="flex items-center gap-2">
            <button
              aria-label="Відкрити меню"
              onClick={() => setDrawerOpen(true)}
              className="p-1 rounded-lg text-text-muted hover:text-border-active hover:bg-surface-panel active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            <a className="flex items-center gap-2" href="#">
              <div className="relative w-8 h-8 rounded-full border border-border-active overflow-hidden">
                <Image
                  src="/assets/logo.webp"
                  alt="KVADRO KYIV 1"
                  fill
                  sizes="32px"
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-headline-sm text-sm font-bold uppercase tracking-wider text-text-primary">
                KVADRO KYIV 1
              </span>
            </a>
          </div>

          {/* Quick Action Call Button */}
          <div className="flex items-center gap-2">
            <a
              className="flex items-center gap-1.5 px-3 py-1.5 bg-border-active text-text-primary rounded-lg font-label-caps text-[11px] uppercase ignition-glow active:scale-95 transition-transform font-bold"
              href={`tel:${s.phoneRaw}`}
            >
              <span className="material-symbols-outlined text-sm">call</span>
              <span>Дзвінок</span>
            </a>
          </div>
        </div>
      </header>

      {/* Slide-out Drawer Navigation Overlay (Mobile) */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="fixed inset-y-0 left-0 w-80 max-w-full bg-surface-panel flex flex-col h-full p-4 justify-between shadow-2xl border-r border-border-subtle"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-border-subtle mb-4">
                <div className="flex items-center gap-2">
                  <div className="relative w-9 h-9 rounded-full border border-border-active overflow-hidden">
                    <Image
                      src="/assets/logo.webp"
                      alt="Logo"
                      fill
                      sizes="36px"
                      className="object-contain"
                    />
                  </div>
                  <span className="font-headline-md text-base font-bold text-text-primary uppercase tracking-tight">
                    KVADRO KYIV 1
                  </span>
                </div>
                <button
                  className="text-text-muted hover:text-border-active p-1"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Закрити меню"
                >
                  <span className="material-symbols-outlined text-2xl">close</span>
                </button>
              </div>

              <nav className="space-y-2">
                <a
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-surface-panel-elevated text-border-active border-l-2 border-border-active font-headline-sm font-bold text-sm"
                  href="#steps"
                  onClick={() => setDrawerOpen(false)}
                >
                  <span className="material-symbols-outlined text-xl">route</span>
                  <span>Маршрути та тури</span>
                </a>
                <a
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-panel-elevated transition-colors font-headline-sm text-sm"
                  href="#price"
                  onClick={() => setDrawerOpen(false)}
                >
                  <span className="material-symbols-outlined text-xl">sell</span>
                  <span>Техпарк та ціни</span>
                </a>
                <a
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-panel-elevated transition-colors font-headline-sm text-sm"
                  href="#booking"
                  onClick={() => setDrawerOpen(false)}
                >
                  <span className="material-symbols-outlined text-xl">calendar_today</span>
                  <span>Онлайн-бронювання</span>
                </a>
                <a
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-panel-elevated transition-colors font-headline-sm text-sm"
                  href="#location"
                  onClick={() => setDrawerOpen(false)}
                >
                  <span className="material-symbols-outlined text-xl">pin_drop</span>
                  <span>Локація та маршрути</span>
                </a>
                <a
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-panel-elevated transition-colors font-headline-sm text-sm"
                  href="#faq"
                  onClick={() => setDrawerOpen(false)}
                >
                  <span className="material-symbols-outlined text-xl">shield</span>
                  <span>Безпека та правила</span>
                </a>
              </nav>
            </div>

            <div className="pt-4 border-t border-border-subtle">
              <p className="font-body-sm text-text-dim text-xs mb-1">{s.addressShort || s.address}</p>
              <a
                className="block font-headline-sm font-bold text-text-primary hover:text-border-active text-base"
                href={`tel:${s.phoneRaw}`}
              >
                {s.phone}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Header (>= lg) */}
      <header className="hidden lg:block bg-surface-base/90 backdrop-blur-md border-b border-border-subtle shadow-lg shadow-surface-base/50 docked full-width top-0 sticky z-50">
        <div className="w-full px-6 sm:px-8 xl:px-12 2xl:px-16 py-3.5 flex justify-between items-center max-w-[1720px] mx-auto">
          {/* Brand Logo Cluster */}
          <a className="flex items-center gap-3.5 group shrink-0" href="#">
            <div className="w-11 h-11 relative rounded-xl border border-border-subtle/80 p-0.5 bg-surface-panel overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:border-border-active shadow-md">
              <Image
                src="/assets/logo.webp"
                alt="KVADRO KYIV 1"
                fill
                sizes="44px"
                className="object-contain p-1"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-headline-md text-xl xl:text-[22px] font-black tracking-tight text-text-primary uppercase group-hover:text-border-active transition-colors leading-tight">
                KVADRO KYIV 1
              </span>
              <span className="font-label-caps text-[10px] tracking-[0.2em] text-border-active uppercase font-bold">
                ОФФРОУД ПАРК КИЇВ
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links - Centered with balanced spacing */}
          <nav className="flex items-center gap-6 xl:gap-8 2xl:gap-10">
            <a
              className="text-text-muted hover:text-text-primary transition-colors duration-200 font-label-caps text-xs xl:text-[13px] tracking-wider uppercase font-bold py-1 relative group"
              href="#stages"
            >
              <span>Етапи</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-border-active transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              className="text-text-muted hover:text-text-primary transition-colors duration-200 font-label-caps text-xs xl:text-[13px] tracking-wider uppercase font-bold py-1 relative group"
              href="#vehicles"
            >
              <span>Техніка</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-border-active transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              className="text-text-muted hover:text-text-primary transition-colors duration-200 font-label-caps text-xs xl:text-[13px] tracking-wider uppercase font-bold py-1 relative group"
              href="#pricing"
            >
              <span>Ціни</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-border-active transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              className="text-text-muted hover:text-text-primary transition-colors duration-200 font-label-caps text-xs xl:text-[13px] tracking-wider uppercase font-bold py-1 relative group"
              href="#location"
            >
              <span>Маршрути</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-border-active transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              className="text-text-muted hover:text-text-primary transition-colors duration-200 font-label-caps text-xs xl:text-[13px] tracking-wider uppercase font-bold py-1 relative group"
              href="#certificates"
            >
              <span>Сертифікати</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-border-active transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              className="text-text-muted hover:text-text-primary transition-colors duration-200 font-label-caps text-xs xl:text-[13px] tracking-wider uppercase font-bold py-1 relative group"
              href="#contacts"
            >
              <span>Контакти</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-border-active transition-all duration-300 group-hover:w-full" />
            </a>
          </nav>

          {/* Trailing Action Cluster */}
          <div className="flex items-center gap-3 xl:gap-4 shrink-0">
            {/* Direct Quick Call */}
            <a
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-surface-panel hover:bg-surface-panel-elevated border border-border-subtle hover:border-border-active text-text-primary transition-all group whitespace-nowrap shadow-sm"
              href={`tel:${s.phoneRaw}`}
            >
              <span className="material-symbols-outlined text-border-active text-[19px]">call</span>
              <span className="font-headline-sm text-xs xl:text-sm font-semibold tracking-tight group-hover:text-border-active transition-colors whitespace-nowrap">
                {s.phone}
              </span>
            </a>

            {/* Telegram Shortcut */}
            <a
              className="w-10 h-10 rounded-xl bg-surface-panel hover:bg-surface-panel-elevated border border-border-subtle text-text-muted hover:text-border-active hover:border-border-active transition-all flex items-center justify-center shadow-sm"
              href={s.telegram}
              rel="noopener noreferrer"
              target="_blank"
              title={`Телеграм ${s.telegramUsername || '@Kvadro_kyiv1'}`}
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
            </a>

            {/* Primary CTA Anchor Button */}
            <a
              className="bg-gradient-to-r from-border-active to-brand-amber hover:brightness-110 text-white font-headline-sm text-xs xl:text-sm font-black uppercase tracking-wider px-5 xl:px-6 py-2.5 xl:py-3 rounded-xl transition-all ignition-glow flex items-center gap-2 active:scale-95 duration-150 whitespace-nowrap shadow-md"
              href="#booking"
            >
              <span>Забронювати</span>
              <span className="material-symbols-outlined text-[19px]">sports_score</span>
            </a>
          </div>
        </div>
      </header>
    </>
  )
}

