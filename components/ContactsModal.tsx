'use client'

import React, { useEffect, useState } from 'react'
import {
  X,
  Phone,
  Send,
  MapPin,
  Clock,
  Navigation,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
} from 'lucide-react'
import { defaultSettings } from '@/lib/defaultData'
import { InstagramIcon } from '@/components/InstagramIcon'

interface ContactsModalProps {
  isOpen: boolean
  onClose: () => void
  settings?: typeof defaultSettings
  onOpenOneClick?: () => void
}

export function ContactsModal({
  isOpen,
  onClose,
  settings,
  onOpenOneClick,
}: ContactsModalProps) {
  const s = settings || defaultSettings
  const [copiedPhone, setCopiedPhone] = useState(false)
  const [copiedAddress, setCopiedAddress] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(s.phoneRaw || s.phone)
      setCopiedPhone(true)
      setTimeout(() => setCopiedPhone(false), 2000)
    }
  }

  const handleCopyAddress = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(s.address)
      setCopiedAddress(true)
      setTimeout(() => setCopiedAddress(false), 2000)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contacts-modal-title"
    >
      {/* Backdrop with blur */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl max-h-[92vh] bg-[#0E121A] border border-border-active/40 rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/95 flex flex-col overflow-hidden z-10 animate-scaleUp">
        {/* Top Accent Gradient Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600 shrink-0" />

        {/* Header */}
        <div className="px-5 pt-5 pb-4 sm:px-7 sm:pt-6 sm:pb-4 border-b border-border-subtle flex items-start justify-between gap-4 shrink-0 bg-surface-panel/60">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-label-caps uppercase font-bold tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>На зв&apos;язку • {s.workingHours}</span>
            </div>
            <h2
              id="contacts-modal-title"
              className="font-headline-xl text-xl sm:text-2xl font-black text-text-primary uppercase leading-tight tracking-tight"
            >
              Контакти та локація <span className="text-border-active">KVADRO KYIV 1</span>
            </h2>
            <p className="font-body-sm text-xs text-text-muted mt-0.5">
              Оберіть зручний спосіб зв&apos;язку або відкрийте маршрут у навігаторі
            </p>
          </div>

          <button
            onClick={onClose}
            type="button"
            aria-label="Закрити"
            className="w-9 h-9 rounded-full bg-surface-base/90 hover:bg-surface-panel-elevated border border-white/10 hover:border-border-active text-text-muted hover:text-white flex items-center justify-center transition-all group shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5 scrollbar-thin scrollbar-thumb-border-active/40">
          {/* 1. Primary Phone & Messengers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Phone / Call Card */}
            <a
              href={`tel:${s.phoneRaw}`}
              className="sm:col-span-2 p-4 rounded-xl bg-gradient-to-r from-surface-panel via-surface-panel-elevated to-surface-panel border border-border-active/50 hover:border-border-active flex items-center justify-between gap-3 transition-all group shadow-lg shadow-border-active/5"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-border-active text-white flex items-center justify-center shrink-0 ignition-glow group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="font-label-caps text-[10px] uppercase tracking-wider text-brand-amber font-bold block">
                    Телефон / Viber (Прямий зв&apos;язок)
                  </span>
                  <span className="font-headline-lg text-lg sm:text-xl font-black text-text-primary group-hover:text-border-active transition-colors font-mono block truncate">
                    {s.phone}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  title="Скопіювати номер"
                  className="px-2.5 py-2 rounded-lg bg-surface-base hover:bg-surface-panel border border-border-subtle hover:border-border-active text-text-muted hover:text-white text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[11px] text-emerald-400 font-bold hidden sm:inline">Скопійовано</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-medium hidden sm:inline">Копіювати</span>
                    </>
                  )}
                </button>
                <span className="px-3.5 py-2 rounded-lg bg-border-active text-white font-label-caps text-xs uppercase font-bold hidden sm:inline-flex items-center gap-1.5">
                  <span>Подзвонити</span>
                </span>
              </div>
            </a>

            {/* Telegram Card */}
            <a
              href={s.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-surface-panel hover:bg-surface-panel-elevated border border-border-subtle hover:border-[#2AABEE] flex items-center justify-between gap-3 transition-all group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#2AABEE]/15 border border-[#2AABEE]/40 text-[#2AABEE] flex items-center justify-center shrink-0 group-hover:bg-[#2AABEE] group-hover:text-white transition-all">
                  <Send className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-label-caps text-[10px] uppercase tracking-wider text-text-dim font-bold block">
                    Telegram-чат
                  </span>
                  <span className="font-headline-sm text-sm font-bold text-text-primary group-hover:text-[#2AABEE] transition-colors truncate block">
                    {s.telegramUsername}
                  </span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-text-dim group-hover:text-[#2AABEE] shrink-0 transition-colors" />
            </a>

            {/* Instagram Card */}
            <a
              href={s.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-surface-panel hover:bg-surface-panel-elevated border border-border-subtle hover:border-[#E1306C] flex items-center justify-between gap-3 transition-all group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#E1306C]/15 border border-[#E1306C]/40 text-[#E1306C] flex items-center justify-center shrink-0 group-hover:bg-[#E1306C] group-hover:text-white transition-all">
                  <InstagramIcon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-label-caps text-[10px] uppercase tracking-wider text-text-dim font-bold block">
                    Instagram (Фото & Відео)
                  </span>
                  <span className="font-headline-sm text-sm font-bold text-text-primary group-hover:text-[#E1306C] transition-colors truncate block">
                    @{s.instagramUsername}
                  </span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-text-dim group-hover:text-[#E1306C] shrink-0 transition-colors" />
            </a>
          </div>

          {/* 2. Address & Working Hours Info Box */}
          <div className="p-4 rounded-xl bg-surface-panel border border-border-subtle space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-border-active/15 border border-border-active/30 text-border-active flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-label-caps text-[10px] uppercase tracking-wider text-text-dim font-bold block">
                    Адреса бази прокату (Дарницький р-н)
                  </span>
                  <p className="font-headline-sm text-sm sm:text-base font-bold text-text-primary mt-0.5">
                    {s.address}
                  </p>
                  <p className="font-body-sm text-xs text-text-muted mt-0.5">
                    15 хвилин від метро Бориспільська • Безкоштовний паркінг на території бази
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyAddress}
                title="Скопіювати адресу"
                className="px-2.5 py-1.5 rounded-lg bg-surface-base hover:bg-surface-panel-elevated border border-border-subtle hover:border-border-active text-text-muted hover:text-white text-xs flex items-center gap-1.5 shrink-0 transition-all cursor-pointer"
              >
                {copiedAddress ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[11px] text-emerald-400 font-bold">Скопійовано</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium hidden sm:inline">Адреса</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-2.5 border-t border-border-subtle/60 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 text-text-muted">
                <Clock className="w-4 h-4 text-brand-amber shrink-0" />
                <span>Графік роботи: <strong className="text-text-primary">{s.workingHours}</strong></span>
              </div>
              <span className="font-mono text-[11px] text-text-dim">
                GPS: 50°23&apos;06.7&quot;N 30°42&apos;48.5&quot;E
              </span>
            </div>
          </div>

          {/* 3. Interactive Map with Direct Google Maps Route Button */}
          <div className="relative rounded-xl overflow-hidden border border-border-subtle bg-surface-base h-52 sm:h-60">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2543.9996874877015!2d30.71088247655339!3d50.38520437157981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTDCsDIzJzA2LjciTiAzMMKwNDInNDguNSJF!5e0!3m2!1suk!2sua!4v1699540795012!5m2!1suk!2sua"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(90%)' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Карта проїзду KVADRO KYIV 1"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E121A] via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
              <div className="px-3 py-1.5 rounded-lg bg-surface-base/90 backdrop-blur-md border border-border-subtle text-[11px] text-text-primary font-semibold hidden sm:flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-border-active" />
                <span>Київ, Бортничі (вул. Лісова 76К)</span>
              </div>

              <a
                href={s.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-border-active hover:bg-brand-amber text-white font-label-caps text-xs uppercase font-bold flex items-center justify-center gap-2 ignition-glow transition-all shadow-lg"
              >
                <Navigation className="w-4 h-4" />
                <span>Прокласти маршрут у Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Quick Actions */}
        {onOpenOneClick ? (
          <div className="px-5 py-3.5 sm:px-7 sm:py-4 border-t border-border-subtle bg-surface-panel/80 flex items-center justify-center shrink-0">
            <button
              type="button"
              onClick={() => {
                onClose()
                onOpenOneClick()
              }}
              className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-border-active to-brand-amber hover:brightness-110 text-white font-headline-sm text-xs sm:text-sm uppercase font-bold flex items-center justify-center gap-2 ignition-glow transition-all active:scale-98 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Замовити зворотний дзвінок (за 15 сек)</span>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

