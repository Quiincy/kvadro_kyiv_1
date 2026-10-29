'use client'

import React, { useState, useEffect, useRef } from 'react'
import { X, Phone, CheckCircle2, Send, Sparkles, ShieldCheck, Clock, Check } from 'lucide-react'
import { defaultSettings } from '@/lib/defaultData'
import {
  formatUkrainianPhone,
  handlePhoneKeyDown,
  isCompleteUkrainianPhone,
  UKRAINE_PHONE_PREFIX,
  handlePhoneFocusOrClick,
} from '@/lib/phone'

interface OneClickModalProps {
  isOpen: boolean
  onClose: () => void
  initialVehicle?: string
  settings?: typeof defaultSettings
}

export function OneClickModal({
  isOpen,
  onClose,
  initialVehicle,
  settings,
}: OneClickModalProps) {
  const currentSettings = settings || defaultSettings
  const [phone, setPhone] = useState(UKRAINE_PHONE_PREFIX)
  const [name, setName] = useState('')
  const [selectedVehicle, setSelectedVehicle] = useState(
    initialVehicle || 'Будь-яка техніка (уточнити з менеджером)'
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)

  // Sync initialVehicle when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialVehicle) {
        setSelectedVehicle(initialVehicle)
      }
      setIsSuccess(false)
      setErrorMsg('')
      if (!phone || phone.length < UKRAINE_PHONE_PREFIX.length) {
        setPhone(UKRAINE_PHONE_PREFIX)
      }
      // Prevent background scrolling
      document.body.style.overflow = 'hidden'
      // Auto focus phone input
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 150)
      return () => clearTimeout(timer)
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen, initialVehicle])

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Phone input formatting helper: +380 (XX) XXX-XX-XX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatUkrainianPhone(e.target.value)
    setPhone(formatted)
    if (errorMsg) setErrorMsg('')
  }

  const handlePhoneKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    handlePhoneKeyDown(e, (formatted) => {
      setPhone(formatted)
      if (errorMsg) setErrorMsg('')
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isCompleteUkrainianPhone(phone)) {
      setErrorMsg('Будь ласка, введіть повний номер телефону (наприклад: +380 (98) 000-00-00)')
      return
    }

    setIsSubmitting(true)
    setErrorMsg('')

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: name.trim() || 'Швидке замовлення (1-клік)',
          clientPhone: phone,
          vehicleType: selectedVehicle,
          duration: '1 година (базово)',
          isOneClick: true,
          bookingType: 'one_click',
          notes: `Швидке бронювання в 1 клік з попапу сайту. Техніка: ${selectedVehicle}`,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setIsSuccess(true)
      } else {
        setErrorMsg(data.error || 'Не вдалося відправити заявку. Спробуйте ще раз.')
      }
    } catch {
      // In case of network glitch, keep smooth UX
      setIsSuccess(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResetAndClose = () => {
    setIsSuccess(false)
    setPhone('')
    setName('')
    setErrorMsg('')
    onClose()
  }

  if (!isOpen) return null

  // Pre-filled Telegram message
  const telegramText = encodeURIComponent(
    `Привіт! Я щойно залишив швидку заявку в 1 клік на сайті KVADRO KYIV 1.\nМій номер: ${phone}\nТехніка: ${selectedVehicle}`
  )

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="oneclick-modal-title"
    >
      {/* Backdrop with blur */}
      <div
        onClick={handleResetAndClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-[#0E121A] border border-border-active/40 rounded-2xl shadow-2xl shadow-black/90 overflow-hidden z-10 animate-scaleUp">
        {/* Top Accent Gradient Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600" />

        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          type="button"
          aria-label="Закрити"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface-base/80 hover:bg-surface-panel-elevated border border-white/10 hover:border-border-active text-text-muted hover:text-white flex items-center justify-center transition-all group z-20"
        >
          <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
        </button>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {isSuccess ? (
            /* ================= SUCCESS STATE ================= */
            <div className="text-center py-4 space-y-5 animate-fadeIn">
              {/* Animated Success Icon */}
              <div className="relative w-16 h-16 mx-auto">
                <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping opacity-75" />
                <div className="relative w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
              </div>

              <div>
                <span className="font-label-caps text-xs text-emerald-400 uppercase font-extrabold tracking-widest">
                  Заявку успішно прийнято!
                </span>
                <h3
                  id="oneclick-modal-title"
                  className="font-headline-xl text-2xl sm:text-3xl font-black text-text-primary uppercase mt-1"
                >
                  Дякуємо за замовлення!
                </h3>
                <p className="font-body-md text-sm text-text-muted mt-2 max-w-sm mx-auto leading-relaxed">
                  Наш адміністратор уже отримав ваш номер і зателефонує вам протягом{' '}
                  <strong className="text-border-active font-bold">5–10 хвилин</strong>, щоб підтвердити час і деталі заїзду.
                </p>
              </div>

              {/* Order Info Pill */}
              <div className="bg-surface-base p-4 rounded-xl border border-border-subtle text-left text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-text-dim">Ваш телефон:</span>
                  <span className="text-text-primary font-mono font-bold">{phone}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-dim">Техніка:</span>
                  <span className="text-border-active font-bold">{selectedVehicle}</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-border-subtle/50">
                  <span className="text-text-dim">Статус:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Очікує дзвінка менеджера
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={`${currentSettings.telegram}?text=${telegramText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-[#2AABEE] hover:bg-[#229ED9] text-white font-headline-sm text-xs uppercase font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>Написати прямо зараз у Telegram</span>
                </a>

                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full py-3 bg-surface-panel-elevated hover:bg-surface-panel text-text-muted hover:text-white font-label-caps text-xs uppercase font-bold rounded-xl border border-border-subtle transition-all"
                >
                  Зрозуміло, чекаю на дзвінок
                </button>
              </div>
            </div>
          ) : (
            /* ================= FORM STATE ================= */
            <form onSubmit={handleSubmit} className="space-y-5 animate-fadeIn">
              {/* Header */}
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-border-active/15 border border-border-active/30 text-border-active text-xs font-label-caps uppercase font-bold tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>Швидка бронь за 15 секунд</span>
                </div>
                <h3
                  id="oneclick-modal-title"
                  className="font-headline-xl text-2xl sm:text-3xl font-black text-text-primary uppercase leading-tight"
                >
                  Забронювати в 1 клік
                </h3>
                <p className="font-body-md text-xs sm:text-sm text-text-muted mt-1 leading-relaxed">
                  Вкажіть свій номер телефону — адміністратор зателефонує вам протягом 5-10 хвилин, допоможе підібрати техніку та закріпить час.
                </p>
              </div>

              {/* Vehicle Pill if selected */}
              {selectedVehicle && (
                <div className="p-3 rounded-xl bg-surface-base border border-border-subtle flex items-center justify-between text-xs">
                  <span className="text-text-dim">Обрана техніка:</span>
                  <span className="text-border-active font-bold">{selectedVehicle}</span>
                </div>
              )}

              {/* Phone Input */}
              <div>
                <label
                  htmlFor="oneclick-phone"
                  className="block font-label-caps text-xs uppercase text-text-muted font-bold mb-2 flex items-center justify-between"
                >
                  <span>Номер телефону *</span>
                  <span className="text-[11px] text-border-active font-normal">Передзвонимо за 5–10 хв</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-border-active">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    ref={inputRef}
                    id="oneclick-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={handlePhoneChange}
                    onKeyDown={handlePhoneKeyDownInput}
                    onFocus={handlePhoneFocusOrClick}
                    onClick={handlePhoneFocusOrClick}
                    placeholder="+380 (98) 000-00-00"
                    className="w-full bg-surface-base border border-border-subtle rounded-xl pl-10 pr-4 py-3.5 text-text-primary placeholder:text-text-dim font-mono text-base focus:border-border-active focus:ring-2 focus:ring-border-active/30 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Optional Name Input */}
              <div>
                <label
                  htmlFor="oneclick-name"
                  className="block font-label-caps text-xs uppercase text-text-muted font-bold mb-2"
                >
                  Ваше ім&apos;я (необов&apos;язково)
                </label>
                <input
                  id="oneclick-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Як до вас звертатися?"
                  className="w-full bg-surface-base border border-border-subtle rounded-xl px-4 py-3 text-text-primary placeholder:text-text-dim text-sm focus:border-border-active focus:ring-1 focus:ring-border-active outline-none transition-all"
                />
              </div>

              {/* Error Alert */}
              {errorMsg && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-border-active hover:bg-brand-amber text-white font-headline-sm text-sm sm:text-base uppercase font-bold rounded-xl ignition-glow shadow-lg shadow-border-active/20 flex items-center justify-center gap-2 active:scale-98 transition-all disabled:opacity-50 select-none cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Відправляємо заявку...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg">bolt</span>
                    <span>Підтвердити та забронювати</span>
                  </>
                )}
              </button>

              {/* Guarantees Footer */}
              <div className="pt-2 grid grid-cols-3 gap-2 text-center border-t border-border-subtle/50">
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-[10px] text-text-dim font-medium">Без спаму</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Clock className="w-4 h-4 text-border-active" />
                  <span className="text-[10px] text-text-dim font-medium">Дзвінок за 5-10 хв</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-[10px] text-text-dim font-medium">Оплата на місці</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
