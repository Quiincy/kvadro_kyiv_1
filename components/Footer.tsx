'use client'

import React from 'react'
import { MaterialIcon } from '@/components/ui/MaterialIcon'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, Send, MapPin, Clock, Lock } from 'lucide-react'
import { defaultSettings } from '@/lib/defaultData'
import { InstagramIcon } from './InstagramIcon'

interface FooterProps {
  settings?: typeof defaultSettings
  onOpenSafety?: () => void
  onOpenOffer?: () => void
}

export function Footer({ settings, onOpenSafety, onOpenOffer }: FooterProps) {
  const currentSettings = settings || defaultSettings

  return (
    <footer className="scroll-mt-20 lg:scroll-mt-24 bg-surface-base border-t border-border-subtle w-full text-text-muted" id="contacts">
      {/* ===================== MOBILE VIEW (< lg) ===================== */}
      <div className="lg:hidden w-full px-4 pt-8 pb-28 pb-[max(7rem,calc(5.5rem+env(safe-area-inset-bottom)))] max-w-md mx-auto flex flex-col items-center text-center gap-4">
        {/* Brand & Description */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border border-border-active overflow-hidden flex items-center justify-center p-0.5 bg-surface-panel">
            <Image
              src="/assets/logo.webp"
              alt="KVADRO KYIV 1"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <span className="font-headline-sm text-sm font-bold text-text-primary uppercase tracking-wider">
            KVADRO KYIV 1
          </span>
        </div>

        <p className="text-xs text-text-dim leading-relaxed">
          {currentSettings.address}<br />
          Графік: {currentSettings.workingHours}
        </p>

        {/* Fast Contact Links */}
        <div className="flex flex-wrap justify-center gap-3 text-xs font-semibold text-text-muted">
          <a
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-panel border border-border-subtle hover:border-border-active hover:text-border-active transition-all"
            href={`tel:${currentSettings.phoneRaw}`}
          >
            <Phone className="w-3.5 h-3.5 text-border-active" />
            <span>{currentSettings.phone}</span>
          </a>
          <a
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-panel border border-border-subtle hover:border-[#2AABEE] hover:text-[#2AABEE] transition-all"
            href={currentSettings.telegram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Send className="w-3.5 h-3.5 text-[#2AABEE]" />
            <span>{currentSettings.telegramUsername}</span>
          </a>
          <a
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-panel border border-border-subtle hover:border-[#E1306C] hover:text-[#E1306C] transition-all"
            href={currentSettings.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon className="w-3.5 h-3.5 text-[#E1306C]" />
            <span>@{currentSettings.instagramUsername}</span>
          </a>
        </div>

        {/* Footer Policy Links */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-[11px] text-text-dim">
          <button
            type="button"
            onClick={onOpenSafety}
            className="hover:text-border-active transition-colors duration-150 cursor-pointer"
          >
            Правила безпеки
          </button>
          <button
            type="button"
            onClick={onOpenOffer}
            className="hover:text-border-active transition-colors duration-150 cursor-pointer"
          >
            Публічна оферта
          </button>
          <a className="hover:text-border-active transition-colors duration-150" href="#location">Локація в Бортничах</a>
          <a className="hover:text-border-active transition-colors duration-150" href="#certificates">Подарункові сертифікати</a>
          <Link className="hover:text-border-active transition-colors duration-150" href="/admin">Панель керування</Link>
        </div>

        {/* Verbatim Copyright */}
        <p className="font-body-sm text-[11px] text-text-dim pt-2 border-t border-border-subtle w-full">
          © 2026 KVADRO KYIV 1. Екстремальний відпочинок у Бортничах. Всі права захищені.
        </p>
      </div>

      {/* ===================== DESKTOP VIEW (>= lg) ===================== */}
      <div className="hidden lg:block">
        {/* Top Footer Information Grid */}
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-12 flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Brand & Mission Info */}
          <div className="max-w-sm space-y-4">
            <a className="flex items-center gap-3" href="#">
              <div className="w-12 h-12 relative overflow-hidden shrink-0">
                <Image
                  src="/assets/logo.webp"
                  alt="KVADRO KYIV 1"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-headline-lg text-headline-lg font-black tracking-tight text-text-primary uppercase">
                  KVADRO KYIV 1
                </span>
                <span className="font-label-caps text-xs text-border-active font-bold tracking-widest uppercase">
                  ЕКСТРЕМАЛЬНИЙ ПРОКАТ КИЇВ
                </span>
              </div>
            </a>
            <p className="font-body-sm text-body-sm text-text-muted">
              Екстремальний прокат квадроциклів, ендуро та баггі у Києві. Прогулянки сімейні, групові, індивідуальні лісовими маршрутами Бортничів.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                className="w-10 h-10 rounded-xl bg-[#E1306C]/15 border border-[#E1306C]/40 hover:border-[#E1306C] hover:bg-[#E1306C] text-[#E1306C] hover:text-white transition-all flex items-center justify-center"
                href={currentSettings.instagram}
                rel="noopener noreferrer"
                target="_blank"
                title={`Інстаграм @${currentSettings.instagramUsername}`}
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                className="w-10 h-10 rounded-xl bg-[#2AABEE]/15 border border-[#2AABEE]/40 hover:border-[#2AABEE] hover:bg-[#2AABEE] text-[#2AABEE] hover:text-white transition-all flex items-center justify-center"
                href={currentSettings.telegram}
                rel="noopener noreferrer"
                target="_blank"
                title={`Телеграм ${currentSettings.telegramUsername}`}
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                className="w-10 h-10 rounded-xl bg-border-active/15 border border-border-active/40 hover:border-border-active hover:bg-border-active text-border-active hover:text-white transition-all flex items-center justify-center"
                href={`tel:${currentSettings.phoneRaw}`}
                title="Зателефонувати"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-8 text-sm">
            <div className="space-y-3">
              <span className="font-label-caps text-label-caps uppercase text-text-primary font-bold tracking-wider block">
                Розділи сайту
              </span>
              <ul className="space-y-2 font-body-sm">
                <li>
                  <a className="text-text-muted hover:text-white hover:translate-x-1 transition-all duration-200 block" href="#stages">
                    Етапи прогулянки
                  </a>
                </li>
                <li>
                  <a className="text-text-muted hover:text-white hover:translate-x-1 transition-all duration-200 block" href="#pricing">
                    Техніка &amp; Прайс
                  </a>
                </li>
                <li>
                  <a className="text-text-muted hover:text-white hover:translate-x-1 transition-all duration-200 block" href="#location">
                    Локація в Бортничах
                  </a>
                </li>
                <li>
                  <a className="text-text-muted hover:text-white hover:translate-x-1 transition-all duration-200 block" href="#stages">
                    Інструктаж та безпека
                  </a>
                </li>
                <li>
                  <a className="text-text-muted hover:text-white hover:translate-x-1 transition-all duration-200 block" href="#certificates">
                    Подарункові сертифікати
                  </a>
                </li>
                <li>
                  <a className="text-border-active font-semibold hover:translate-x-1 transition-all duration-200 block" href="#booking">
                    Забронювати заїзд
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="font-label-caps text-label-caps uppercase text-text-primary font-bold tracking-wider block">
                Контакти &amp; Адреса
              </span>
              <ul className="space-y-2 font-body-sm text-text-muted">
                <li className="flex items-start gap-2">
                  <MaterialIcon className="text-border-active text-base mt-0.5">location_on</MaterialIcon>
                  <a
                    className="hover:text-text-primary transition-colors"
                    href={currentSettings.googleMapsUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {currentSettings.addressShort}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon className="text-border-active text-base">call</MaterialIcon>
                  <a className="hover:text-text-primary transition-colors" href={`tel:${currentSettings.phoneRaw}`}>
                    {currentSettings.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon className="text-border-active text-base">schedule</MaterialIcon>
                  <span>{currentSettings.workingHours}</span>
                </li>
                <li className="pt-2">
                  <Link
                    href="/admin"
                    className="inline-flex items-center gap-1.5 text-xs text-text-dim hover:text-border-active transition-colors font-mono"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Панель керування</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Shell Layout */}
        <div className="border-t border-border-subtle py-6 bg-surface-base">
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-body-sm text-text-muted">
            <p>© 2026 KVADRO KYIV 1. Всі права захищені. Екстремальний прокат квадроциклів, ендуро та баггі у Києві.</p>
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={onOpenSafety}
                className="hover:text-text-primary transition-colors cursor-pointer"
              >
                Правила безпеки
              </button>
              <button
                type="button"
                onClick={onOpenOffer}
                className="hover:text-text-primary transition-colors cursor-pointer"
              >
                Публічна оферта
              </button>
              <a className="hover:text-text-primary transition-colors" href="#certificates">Подарункові сертифікати</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
