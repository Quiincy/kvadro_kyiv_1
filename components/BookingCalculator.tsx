'use client'

import React, { useState, useId, useRef, useEffect, useMemo } from 'react'
import { MaterialIcon } from '@/components/ui/MaterialIcon'
import { FormFieldTooltip, FormAlertBanner } from '@/components/ui/FormFieldTooltip'
import { Check, Send, Phone, Calendar, User, Sparkles, CheckCircle2, ChevronDown } from 'lucide-react'
import { InstagramIcon } from '@/components/InstagramIcon'
import { defaultSettings, defaultFleet, FleetItem } from '@/lib/defaultData'
import {
  formatUkrainianPhone,
  handlePhoneKeyDown,
  isCompleteUkrainianPhone,
  UKRAINE_PHONE_PREFIX,
  handlePhoneFocusOrClick,
} from '@/lib/phone'

interface VehicleOption {
  id: string
  name: string
  rates: { [hours: number]: number }
  passengerRate?: number
}

const defaultVehicleOptions: VehicleOption[] = defaultFleet.map((v) => {
  const rates: { [hours: number]: number } = {}
  if (v.price1h) rates[1] = v.price1h
  if (v.price2h) rates[2] = v.price2h
  if (v.price3h) rates[3] = v.price3h
  return {
    id: v.id,
    name: v.title,
    rates,
    passengerRate: v.passengerPrice,
  }
})

interface CustomSelectOption {
  value: string | number
  label: string
  badge?: string
}

interface CustomSelectProps {
  label: string
  value: string | number
  options: CustomSelectOption[]
  onChange: (value: any) => void
  id?: string
}

function CustomSelect({ label, value, options, onChange, id }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((opt) => opt.value === value) || options[0]

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={containerRef}>
      <label className="block font-label-caps text-xs uppercase text-text-muted font-bold mb-2">
        {label}
      </label>

      {/* Custom Trigger Button with comfortable arrow padding */}
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full bg-surface-base border rounded-xl px-4 py-3 text-left flex items-center justify-between text-text-primary transition-all duration-150 outline-none select-none min-h-[48px] ${
          isOpen
            ? 'border-border-active ring-1 ring-border-active shadow-md shadow-border-active/10'
            : 'border-border-subtle hover:border-border-active/60'
        }`}
      >
        <span className="font-headline-sm text-sm text-text-primary font-semibold truncate pr-2">
          {selectedOption ? selectedOption.label : 'Оберіть...'}
        </span>
        <div className="flex items-center gap-2 shrink-0 pr-1">
          {selectedOption?.badge && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-border-active/15 text-border-active hidden sm:inline">
              {selectedOption.badge}
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 text-border-active transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* Custom Floating Popover Menu */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute top-full left-0 right-0 mt-1.5 z-50 bg-surface-panel-elevated/98 backdrop-blur-xl border border-border-subtle rounded-xl shadow-2xl p-1.5 space-y-1 animate-in fade-in-0 zoom-in-95 duration-150 max-h-60 overflow-y-auto"
        >
          {options.map((option) => {
            const isSelected = option.value === value
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-border-active/15 text-border-active font-bold border border-border-active/30'
                    : 'text-text-muted hover:text-text-primary hover:bg-surface-panel'
                }`}
              >
                <span>{option.label}</span>
                {isSelected && <Check className="w-4 h-4 text-border-active shrink-0 ml-2" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

interface CustomCheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  sublabel?: string
  badge?: string
  disabled?: boolean
  disabledMessage?: string
}

function CustomCheckbox({
  checked,
  onChange,
  label,
  sublabel,
  badge,
  disabled = false,
  disabledMessage,
}: CustomCheckboxProps) {
  return (
    <div
      onClick={() => {
        if (!disabled) {
          onChange(!checked)
        }
      }}
      onKeyDown={(e) => {
        if (!disabled && (e.key === ' ' || e.key === 'Enter')) {
          e.preventDefault()
          onChange(!checked)
        }
      }}
      tabIndex={disabled ? -1 : 0}
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled}
      className={`w-full p-3.5 rounded-xl border transition-all duration-150 flex items-center justify-between min-h-[52px] select-none outline-none focus-visible:ring-2 focus-visible:ring-border-active ${
        disabled
          ? 'bg-surface-base/40 border-border-subtle/40 opacity-40 cursor-not-allowed'
          : checked
          ? 'bg-border-active/5 border-border-active/70 cursor-pointer shadow-sm shadow-border-active/10'
          : 'bg-surface-base border-border-subtle hover:border-slate-600 cursor-pointer'
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Custom Square Box - fixed size to completely avoid layout shift */}
        <div
          className={`w-5 h-5 min-w-[20px] min-h-[20px] rounded-md border flex items-center justify-center transition-all duration-150 ${
            disabled
              ? 'bg-surface-panel border-border-subtle/50'
              : checked
              ? 'bg-border-active border-border-active text-white shadow-sm shadow-border-active/20'
              : 'bg-surface-panel border-border-subtle'
          }`}
        >
          {checked && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
        </div>

        <div className="flex flex-col">
          <span
            className={`font-body-md text-xs sm:text-sm font-semibold transition-colors ${
              disabled ? 'text-text-dim' : checked ? 'text-text-primary' : 'text-text-muted'
            }`}
          >
            {disabled && disabledMessage ? disabledMessage : label}
          </span>
          {sublabel && !disabled && (
            <span className="text-[11px] text-text-dim">{sublabel}</span>
          )}
        </div>
      </div>

      {badge && !disabled && (
        <span className="text-xs text-brand-amber font-bold ml-2 shrink-0">
          {badge}
        </span>
      )}
    </div>
  )
}

interface BookingCalculatorProps {
  initialVehicle?: string
  fleet?: FleetItem[]
  settings?: typeof defaultSettings
  onOpenOneClick?: (vehicleTitle?: string) => void
}

export function BookingCalculator({
  initialVehicle,
  fleet,
  settings,
  onOpenOneClick,
}: BookingCalculatorProps) {
  const currentSettings = settings || defaultSettings
  const activeFleet = fleet && fleet.length > 0 ? fleet : defaultFleet

  const vehicles: VehicleOption[] = useMemo(() => {
    return activeFleet.map((v) => {
      const rates: { [hours: number]: number } = {}
      if (v.price1h) rates[1] = v.price1h
      if (v.price2h) rates[2] = v.price2h
      if (v.price3h) rates[3] = v.price3h
      return {
        id: v.id,
        name: v.title,
        rates,
        passengerRate: v.passengerPrice,
      }
    })
  }, [activeFleet])

  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(() => {
    if (initialVehicle) {
      const match = vehicles.find(
        (v) =>
          v.name.toLowerCase().includes(initialVehicle.toLowerCase()) ||
          initialVehicle.toLowerCase().includes(v.name.toLowerCase()) ||
          v.id === initialVehicle
      )
      if (match) return match.id
    }
    return vehicles[0]?.id || 'quad-250'
  })

  const [hours, setHours] = useState<number>(1)
  const [withPassenger, setWithPassenger] = useState<boolean>(false)
  const [isIndividual, setIsIndividual] = useState<boolean>(false)

  // Dedicated selection handler that keeps hours and passenger options valid
  const handleSelectVehicle = (id: string) => {
    setSelectedVehicleId(id)
    const vehicle = vehicles.find((v) => v.id === id)
    if (vehicle) {
      const hoursList = Object.keys(vehicle.rates).map(Number)
      if (!hoursList.includes(hours) && hoursList.length > 0) {
        setHours(hoursList[0])
      }
      if (!vehicle.passengerRate) {
        setWithPassenger(false)
      }
    }
  }

  // Only sync when initialVehicle prop is intentionally changed from the outside (e.g. from FleetPricing)
  const prevInitialVehicleRef = useRef(initialVehicle)
  useEffect(() => {
    if (initialVehicle && initialVehicle !== prevInitialVehicleRef.current) {
      prevInitialVehicleRef.current = initialVehicle
      const match = vehicles.find(
        (v) =>
          v.name.toLowerCase().includes(initialVehicle.toLowerCase()) ||
          initialVehicle.toLowerCase().includes(v.name.toLowerCase()) ||
          v.id === initialVehicle
      )
      if (match) {
        setSelectedVehicleId(match.id)
        const hoursList = Object.keys(match.rates).map(Number)
        if (!hoursList.includes(hours) && hoursList.length > 0) {
          setHours(hoursList[0])
        }
        if (!match.passengerRate) {
          setWithPassenger(false)
        }
      }
    }
  }, [initialVehicle, vehicles, hours])

  // Form fields
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState(UKRAINE_PHONE_PREFIX)
  const [preferredDate, setPreferredDate] = useState('')
  const [notes, setNotes] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [nameError, setNameError] = useState('')
  const [phoneError, setPhoneError] = useState('')

  const nameInputId = useId()
  const phoneInputId = useId()
  const dateInputId = useId()
  const notesInputId = useId()
  const desktopNameInputId = useId()
  const desktopPhoneInputId = useId()
  const desktopDateInputId = useId()
  const desktopNotesInputId = useId()
  const todayDate = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Kyiv' }).format(new Date())

  // Phone input formatting helper: +380 (XX) XXX-XX-XX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatUkrainianPhone(e.target.value)
    setClientPhone(formatted)
    if (phoneError) setPhoneError('')
    if (errorMsg) setErrorMsg('')
  }

  const onPhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    handlePhoneKeyDown(e, (formatted) => {
      setClientPhone(formatted)
      if (phoneError) setPhoneError('')
      if (errorMsg) setErrorMsg('')
    })
  }

  const currentVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0] || defaultVehicleOptions[0]

  // Ensure selected hour is valid for the vehicle
  const availableHours = Object.keys(currentVehicle.rates).map(Number)
  const validHours = availableHours.includes(hours) ? hours : (availableHours[0] || 1)

  // Base price
  const basePrice = currentVehicle.rates[validHours] || 1400

  // Passenger surcharge
  const passengerSurcharge = withPassenger && currentVehicle.passengerRate
    ? currentVehicle.passengerRate * validHours
    : 0

  // Individual surcharge
  const individualSurcharge = isIndividual ? currentSettings.individualSurchargePerHour * validHours : 0

  // Total calculated price
  const totalPrice = basePrice + passengerSurcharge + individualSurcharge

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024

    if (!clientName.trim()) {
      setNameError("Будь ласка, вкажіть ваше ім'я")
      setPhoneError('')
      const el = document.getElementById(isDesktop ? desktopNameInputId : nameInputId)
      el?.focus()
      return
    }

    if (!isCompleteUkrainianPhone(clientPhone)) {
      setNameError('')
      setPhoneError('Введіть повний номер телефону')
      const el = document.getElementById(isDesktop ? desktopPhoneInputId : phoneInputId)
      el?.focus()
      return
    }

    setIsSubmitting(true)
    setNameError('')
    setPhoneError('')
    setErrorMsg('')

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          clientPhone,
          vehicleType: currentVehicle.name,
          duration: `${validHours} ${validHours === 1 ? 'година' : 'години'}`,
          hasPassenger: withPassenger && Boolean(currentVehicle.passengerRate),
          isIndividual,
          calculatedTotal: totalPrice,
          preferredDate: preferredDate || 'Якнайшвидше',
          notes,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setSubmitted(true)
      } else {
        setErrorMsg(data.error || 'Помилка при відправці. Спробуйте ще раз.')
      }
    } catch {
      setErrorMsg(
        "Не вдалося з'єднатися з сервером. Перевірте інтернет або напишіть нам напряму в Telegram чи зателефонуйте."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // Generate Telegram pre-filled text
  const telegramMessage = encodeURIComponent(
    `Привіт! Хочу забронювати прогулянку в KVADRO KYIV 1:\n` +
    `• Техніка: ${currentVehicle.name}\n` +
    `• Тривалість: ${validHours} год\n` +
    `• Пасажир: ${withPassenger && currentVehicle.passengerRate ? 'Так' : 'Ні'}\n` +
    `• Формат: ${isIndividual ? 'Індивідуальний VIP' : 'Груповий'}\n` +
    (preferredDate ? `• Бажана дата: ${preferredDate}\n` : '') +
    `• Орієнтовна сума: ${totalPrice} грн\n` +
    `• Ім'я: ${clientName || 'Гість'}\n` +
    `• Телефон: ${clientPhone || 'Вказано в чаті'}` +
    (notes.trim() ? `\n• Коментар: ${notes.trim()}` : '')
  )

  // Duration dropdown options
  const durationOptions: CustomSelectOption[] = availableHours.map((h) => ({
    value: h,
    label: `${h} ${h === 1 ? 'година' : 'години'} ${h === 2 ? '(Рекомендовано)' : h === 3 ? '(Максимум вражень)' : ''}`,
  }))

  // Group format dropdown options
  const formatOptions: CustomSelectOption[] = [
    { value: 'standard', label: 'У складі групи' },
    { value: 'individual', label: `Індивідуально без сторонніх (+${currentSettings.individualSurchargePerHour} грн/год)` },
  ]

  return (
    <section id="booking" className="scroll-mt-20 lg:scroll-mt-24 border-t border-b border-border-subtle relative bg-surface-base">
      {/* ===================== MOBILE VIEW (< lg) ===================== */}
      <div className="lg:hidden py-10 px-4 bg-surface-panel/30">
        <div className="max-w-md mx-auto space-y-6">
          <div>
            <span className="font-label-caps text-xs text-border-active uppercase font-bold tracking-wider">
              Швидка бронь
            </span>
            <p className="font-headline-xl-mobile text-2xl font-black text-text-primary uppercase mt-1 leading-tight">
              Забронювати прогулянку
            </p>
            <p className="font-body-sm text-xs text-text-muted mt-1">
              Заповніть форму — менеджер зв&apos;яжеться з вами за 5 хвилин для підтвердження часу
            </p>
          </div>

          {submitted ? (
            <div className="bg-surface-panel p-6 rounded-xl border border-emerald-500/40 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <p className="font-headline-sm text-lg font-bold text-text-primary">
                Дякуємо! Вашу заявку прийнято
              </p>
              <p className="text-xs text-text-muted">
                Менеджер KVADRO KYIV 1 зв&apos;яжеться з вами за номером <strong className="text-text-primary">{clientPhone}</strong> протягом 10 хвилин.
              </p>
              <div className="p-3 bg-surface-base rounded-lg border border-border-subtle text-left text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-text-dim">Техніка:</span>
                  <span className="text-text-primary font-bold">{currentVehicle.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-dim">Тривалість:</span>
                  <span className="text-text-primary font-bold">{validHours} год</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-dim">Сума:</span>
                  <span className="text-border-active font-black">{totalPrice} грн</span>
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <a
                  href={`${currentSettings.telegram}?text=${telegramMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#2AABEE] text-white font-label-caps text-xs uppercase font-bold rounded-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Відкрити в Telegram</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false)
                    setClientPhone(UKRAINE_PHONE_PREFIX)
                  }}
                  className="w-full py-2.5 bg-surface-panel-elevated text-text-muted hover:text-text-primary font-label-caps text-xs uppercase rounded-lg border border-border-subtle"
                >
                  Новий розрахунок
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-4 bg-surface-panel p-4 rounded-xl border border-border-subtle"
              id="booking-form"
            >
              {/* Technique Selector Pills - stabilized border */}
              <div>
                <label className="block font-label-caps text-[11px] text-text-muted uppercase mb-2 font-semibold tracking-wider">
                  1. Оберіть вид техніки
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {vehicles.map((tech) => (
                    <button
                      key={tech.id}
                      type="button"
                      onClick={() => handleSelectVehicle(tech.id)}
                      className={`p-2.5 rounded-lg border text-center transition-all font-semibold select-none ${
                        selectedVehicleId === tech.id
                          ? 'border-border-active bg-border-active text-white font-bold ring-1 ring-border-active shadow-md'
                          : 'border-border-subtle bg-surface-base text-text-muted hover:border-slate-500 hover:text-white'
                      }`}
                    >
                      {tech.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration Selector */}
              <div>
                <label className="block font-label-caps text-[11px] text-text-muted uppercase mb-2 font-semibold tracking-wider">
                  2. Тривалість прогулянки
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {([1, 2, 3] as const).map((h) => {
                    const isAvailable = availableHours.includes(h)
                    const isSelected = validHours === h
                    return (
                      <button
                        key={h}
                        type="button"
                        disabled={!isAvailable}
                        onClick={() => setHours(h)}
                        className={`p-2.5 rounded-lg border text-center font-semibold transition-all select-none ${
                          !isAvailable
                            ? 'opacity-40 cursor-not-allowed border-border-subtle bg-surface-base/50 text-text-dim'
                            : isSelected
                            ? 'border-border-active bg-border-active text-white font-bold ring-1 ring-border-active shadow-md'
                            : 'border-border-subtle bg-surface-base text-text-muted hover:border-slate-500 hover:text-white'
                        }`}
                      >
                        {h} {h === 1 ? 'година' : 'години'}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Custom Non-Jumping Checkbox for Passenger on Mobile */}
              <CustomCheckbox
                checked={withPassenger}
                onChange={setWithPassenger}
                label={`Поїздка з пасажиром (+${currentVehicle.passengerRate || 0} грн/год)`}
                badge={`+${(currentVehicle.passengerRate || 0) * validHours} грн`}
                disabled={!currentVehicle.passengerRate}
                disabledMessage="Поїздка з пасажиром (недоступно для одномісного мото)"
              />

              {/* Custom Non-Jumping Checkbox for Individual VIP Format on Mobile */}
              <CustomCheckbox
                checked={isIndividual}
                onChange={setIsIndividual}
                label={`Індивідуальний тур без групи (+${currentSettings.individualSurchargePerHour} грн/год)`}
                sublabel="Тільки ваша компанія та інструктор"
                badge={`+${currentSettings.individualSurchargePerHour * validHours} грн`}
              />

              {/* Personal Data Inputs */}
              <div className="space-y-3 pt-1 min-w-0">
                <div className="min-w-0">
                  <label htmlFor={nameInputId} className="block font-label-caps text-[11px] text-text-muted uppercase mb-1 font-semibold">
                    Ваше ім&apos;я
                  </label>
                  <input
                    id={nameInputId}
                    type="text"
                    aria-required="true"
                    aria-invalid={Boolean(nameError)}
                    value={clientName}
                    onChange={(e) => {
                      setClientName(e.target.value)
                      if (nameError) setNameError('')
                      if (errorMsg) setErrorMsg('')
                    }}
                    placeholder="Олександр"
                    className={`w-full max-w-full min-w-0 box-border block bg-surface-base border rounded-lg px-3 py-2.5 text-text-primary text-base placeholder:text-text-dim outline-none transition-all ${
                      nameError
                        ? 'border-border-active ring-2 ring-border-active/25 bg-border-active/[0.03]'
                        : 'border-border-subtle focus:border-border-active focus:ring-1 focus:ring-border-active'
                    }`}
                  />
                  <FormFieldTooltip
                    message={nameError}
                    subtext="Як наш адміністратор може до вас звертатися?"
                  />
                </div>
                <div className="min-w-0">
                  <label htmlFor={phoneInputId} className="block font-label-caps text-[11px] text-text-muted uppercase mb-1 font-semibold">
                    Номер телефону
                  </label>
                  <input
                    id={phoneInputId}
                    type="tel"
                    aria-required="true"
                    aria-invalid={Boolean(phoneError)}
                    value={clientPhone}
                    onChange={handlePhoneChange}
                    onKeyDown={onPhoneKeyDown}
                    onFocus={handlePhoneFocusOrClick}
                    onClick={handlePhoneFocusOrClick}
                    placeholder="+380 (98) 000-00-00"
                    className={`w-full max-w-full min-w-0 box-border block bg-surface-base border rounded-lg px-3 py-2.5 text-text-primary text-base font-mono placeholder:text-text-dim outline-none transition-all ${
                      phoneError
                        ? 'border-border-active ring-2 ring-border-active/25 bg-border-active/[0.03]'
                        : 'border-border-subtle focus:border-border-active focus:ring-1 focus:ring-border-active'
                    }`}
                  />
                  <FormFieldTooltip
                    message={phoneError}
                    subtext="Формат: +380 (XX) XXX-XX-XX"
                  />
                </div>
                <div className="min-w-0">
                  <label htmlFor={dateInputId} className="block font-label-caps text-[11px] text-text-muted uppercase mb-1 font-semibold">
                    Бажана дата заїзду
                  </label>
                  <div className="relative min-w-0">
                    <input
                      id={dateInputId}
                      type="date"
                      min={todayDate}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className={`w-full max-w-full min-w-0 box-border block bg-surface-base border border-border-subtle rounded-lg px-3 py-2.5 text-base focus:border-border-active focus:ring-1 focus:ring-border-active outline-none appearance-none transition-colors ${
                        preferredDate ? 'text-text-primary' : 'text-text-muted'
                      }`}
                    />
                  </div>
                </div>
                <div className="min-w-0">
                  <label htmlFor={notesInputId} className="block font-label-caps text-[11px] text-text-muted uppercase mb-1 font-semibold">
                    Побажання або час (необов&apos;язково)
                  </label>
                  <input
                    id={notesInputId}
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Наприклад: 2 квадроцикли на 14:00"
                    className="w-full max-w-full min-w-0 box-border block bg-surface-base border border-border-subtle rounded-lg px-3 py-2.5 text-text-primary text-base placeholder:text-text-dim focus:border-border-active focus:ring-1 focus:ring-border-active outline-none"
                  />
                </div>
              </div>

              {/* Live Cost Summary */}
              <div className="p-3 bg-surface-base rounded-lg border border-border-subtle flex items-center justify-between text-xs min-h-[44px]">
                <span className="text-text-muted">Вартість заїзду:</span>
                <span className="font-price-val text-lg font-black text-border-active">
                  {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} грн
                </span>
              </div>

              <FormAlertBanner message={errorMsg} onDismiss={() => setErrorMsg('')} />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-border-active text-text-primary font-label-caps text-label-caps uppercase rounded-lg ignition-glow font-bold mt-2 active:scale-98 transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Відправка...' : 'Підтвердити та забронювати'}
              </button>

              {/* 1-Click Fast Booking Button */}
              {onOpenOneClick && (
                <div className="pt-2">
                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-border-subtle"></div>
                    <span className="flex-shrink mx-2 text-[10px] font-label-caps text-text-dim uppercase font-bold tracking-wider">
                      Або без калькулятора
                    </span>
                    <div className="flex-grow border-t border-border-subtle"></div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenOneClick(currentVehicle.name)}
                    className="w-full py-3 bg-surface-base hover:bg-surface-panel-elevated border border-border-active/60 hover:border-border-active text-border-active font-label-caps text-xs uppercase font-extrabold rounded-lg flex items-center justify-center gap-2 transition-all active:scale-98 shadow-sm"
                  >
                    <MaterialIcon className="text-base">bolt</MaterialIcon>
                    <span>Забронювати в 1 клік (тільки телефон)</span>
                  </button>
                </div>
              )}
            </form>
          )}

          {/* Fast Social Contact Channels */}
          <div className="pt-2">
            <p className="text-center font-label-caps text-[11px] text-text-dim uppercase mb-3 font-semibold tracking-wider">
              Або напишіть нам напряму в месенджер
            </p>
            <div className="grid grid-cols-2 gap-3">
              <a
                className="flex items-center justify-center gap-2 p-2.5 bg-surface-panel rounded-lg border border-border-subtle hover:border-[#2AABEE] text-text-primary hover:text-[#2AABEE] text-xs font-semibold transition-all"
                href={currentSettings.telegram}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Send className="w-4 h-4 text-[#2AABEE] shrink-0" />
                <span>Telegram ({currentSettings.telegramUsername})</span>
              </a>
              <a
                className="flex items-center justify-center gap-2 p-2.5 bg-surface-panel rounded-lg border border-border-subtle hover:border-[#E1306C] text-text-primary hover:text-[#E1306C] text-xs font-semibold transition-all"
                href={currentSettings.instagram}
                rel="noopener noreferrer"
                target="_blank"
              >
                <InstagramIcon className="w-4 h-4 text-[#E1306C] shrink-0" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== DESKTOP VIEW (>= lg) ===================== */}
      <div className="hidden lg:block py-20 bg-surface-base">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Context & Booking Guidelines */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              <span className="font-label-caps text-label-caps text-border-active uppercase tracking-widest font-extrabold flex items-center gap-2">
                <MaterialIcon className="text-sm">event_available</MaterialIcon>
                Бронювання онлайн
              </span>
              <h2 className="font-headline-xl text-3xl md:text-headline-xl text-text-primary font-black uppercase">
                Забронювати прогулянку
              </h2>
              <p className="font-body-md text-text-muted">
                Оберіть вид техніки, бажану дату та зручний час заїзду. Наш адміністратор зв&apos;яжеться з вами протягом 5–10 хвилин для підтвердження броні.
              </p>

              {/* Direct Channels Box */}
              <div className="p-6 rounded-xl bg-surface-panel border border-border-subtle space-y-4">
                <p className="font-headline-sm text-sm uppercase text-text-primary font-bold tracking-wider">
                  Швидкий зв&apos;язок без заповнення форми:
                </p>

                {/* 1-Click Quick Action */}
                {onOpenOneClick && (
                  <button
                    type="button"
                    onClick={() => onOpenOneClick(currentVehicle.name)}
                    className="w-full flex items-center gap-3 p-3.5 rounded-lg bg-border-active/10 border border-border-active/40 hover:border-border-active text-left transition-all group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded bg-border-active/20 flex items-center justify-center text-border-active group-hover:scale-110 transition-transform shrink-0">
                      <MaterialIcon className="text-xl">bolt</MaterialIcon>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-sm text-text-primary font-bold group-hover:text-border-active flex items-center gap-2">
                        <span>Забронювати в 1 клік</span>
                        <span className="text-[10px] bg-border-active text-white px-1.5 py-0.5 rounded font-mono font-bold leading-none">
                          15 сек
                        </span>
                      </span>
                      <span className="font-body-sm text-xs text-text-dim">
                        Вкажіть лише телефон — ми передзвонимо
                      </span>
                    </div>
                  </button>
                )}

                <a
                  className="flex items-center gap-3 p-3 rounded-lg bg-surface-base border border-border-subtle hover:border-border-active transition-all group"
                  href={`tel:${currentSettings.phoneRaw}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-border-active/15 border border-border-active/40 flex items-center justify-center text-border-active group-hover:bg-border-active group-hover:text-white transition-all shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-body-sm text-xs text-text-dim">Телефон / Viber:</span>
                    <span className="font-headline-sm text-base text-text-primary font-bold group-hover:text-border-active transition-colors">
                      {currentSettings.phone}
                    </span>
                  </div>
                </a>

                <a
                  className="flex items-center gap-3 p-3 rounded-lg bg-surface-base border border-border-subtle hover:border-[#2AABEE] transition-all group"
                  href={currentSettings.telegram}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#2AABEE]/15 border border-[#2AABEE]/40 flex items-center justify-center text-[#2AABEE] group-hover:bg-[#2AABEE] group-hover:text-white transition-all shrink-0">
                    <Send className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-body-sm text-xs text-text-dim">Наш Телеграм:</span>
                    <span className="font-headline-sm text-base text-text-primary font-bold group-hover:text-[#2AABEE] transition-colors">
                      {currentSettings.telegramUsername}
                    </span>
                  </div>
                </a>

                <a
                  className="flex items-center gap-3 p-3 rounded-lg bg-surface-base border border-border-subtle hover:border-[#E1306C] transition-all group"
                  href={currentSettings.instagram}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E1306C]/15 border border-[#E1306C]/40 flex items-center justify-center text-[#E1306C] group-hover:bg-[#E1306C] group-hover:text-white transition-all shrink-0">
                    <InstagramIcon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-body-sm text-xs text-text-dim">Наш Інстаграм (фото &amp; відео):</span>
                    <span className="font-headline-sm text-base text-text-primary font-bold group-hover:text-[#E1306C] transition-colors">
                      @{currentSettings.instagramUsername}
                    </span>
                  </div>
                </a>
              </div>

              {/* Quick Notice */}
              <div className="flex items-center gap-3 text-xs text-text-dim">
                <MaterialIcon className="text-brand-amber text-base">info</MaterialIcon>
                <span>Для оренди права категорії А або В не є обов&apos;язковими для закритих лісових трас.</span>
              </div>
            </div>

            {/* Right: Engineered Reservation Form */}
            <div className="lg:col-span-7 bg-surface-panel border border-border-subtle rounded-xl p-8 shadow-xl">
              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-success-emerald/20 border border-success-emerald/40 flex items-center justify-center mx-auto text-success-emerald">
                    <MaterialIcon className="text-3xl">task_alt</MaterialIcon>
                  </div>
                  <h3 className="font-headline-lg text-2xl font-black text-text-primary uppercase">
                    Дякуємо! Ваша заявка прийнята
                  </h3>
                  <p className="font-body-md text-text-muted max-w-md mx-auto">
                    Інструктор та адміністратор KVADRO KYIV 1 зв&apos;яжеться з вами за вказаним номером протягом 5–10 хвилин.
                  </p>
                  <div className="p-4 rounded-lg bg-surface-base border border-border-subtle text-left max-w-md mx-auto text-sm space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-text-dim">Техніка:</span>
                      <span className="text-text-primary font-bold">{currentVehicle.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-dim">Тривалість:</span>
                      <span className="text-text-primary font-bold">{validHours} год</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-dim">Орієнтовна сума:</span>
                      <span className="text-border-active font-black text-base">{totalPrice} грн</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4 pt-4">
                    <a
                      href={`${currentSettings.telegram}?text=${telegramMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-lg bg-[#2AABEE] text-white font-headline-sm text-xs uppercase font-bold flex items-center gap-2 hover:brightness-110"
                    >
                      <Send className="w-4 h-4" />
                      <span>Відкрити в Telegram</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false)
                        setClientPhone(UKRAINE_PHONE_PREFIX)
                      }}
                      className="px-6 py-3 rounded-lg bg-surface-panel-elevated text-text-muted hover:text-text-primary font-headline-sm text-xs uppercase font-bold border border-border-subtle"
                    >
                      Новий розрахунок
                    </button>
                  </div>
                </div>
              ) : (
                <form className="space-y-6" id="reservationForm" onSubmit={handleSubmit} noValidate>
                  {/* Vehicle Selection Radio Matrix - stabilized border */}
                  <div>
                    <label className="block font-headline-sm text-sm uppercase text-text-primary font-bold mb-3">
                      1. Оберіть вид техніки:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="vehicleSelectionContainer">
                      {vehicles.map((v) => {
                        const isSelected = selectedVehicleId === v.id
                        return (
                          <div
                            key={v.id}
                            onClick={() => handleSelectVehicle(v.id)}
                            onKeyDown={(e) => {
                              if (e.key === ' ' || e.key === 'Enter') {
                                e.preventDefault()
                                handleSelectVehicle(v.id)
                              }
                            }}
                            tabIndex={0}
                            role="radio"
                            aria-checked={isSelected}
                            className={`flex items-center gap-3 p-3 rounded-xl bg-surface-base cursor-pointer transition-all duration-150 border select-none min-h-[48px] outline-none focus-visible:ring-2 focus-visible:ring-border-active ${
                              isSelected
                                ? 'border-border-active bg-surface-panel-elevated/70 shadow-sm shadow-border-active/10 ring-1 ring-border-active'
                                : 'border-border-subtle hover:border-border-active/60'
                            }`}
                          >
                            <div
                              className={`w-4 h-4 min-w-[16px] min-h-[16px] rounded-full border flex items-center justify-center transition-all ${
                                isSelected ? 'border-border-active' : 'border-border-subtle'
                              }`}
                            >
                              {isSelected && (
                                <div className="w-2 h-2 rounded-full bg-border-active" />
                              )}
                            </div>
                            <span className="font-headline-sm text-sm text-text-primary font-semibold">
                              {v.name}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Custom Dropdowns: Duration & Format (Properly spaced chevrons, no sticking to edge) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <CustomSelect
                      id="rideDuration"
                      label="Тривалість заїзду:"
                      value={validHours}
                      options={durationOptions}
                      onChange={(val) => setHours(Number(val))}
                    />

                    <CustomSelect
                      id="rideFormat"
                      label="Формат групи:"
                      value={isIndividual ? 'individual' : 'standard'}
                      options={formatOptions}
                      onChange={(val) => setIsIndividual(val === 'individual')}
                    />
                  </div>

                  {/* Custom Non-Jumping Checkbox for Passenger Option */}
                  <CustomCheckbox
                    checked={withPassenger}
                    onChange={setWithPassenger}
                    label={`Поїздка з пасажиром (+${currentVehicle.passengerRate || 0} грн/год)`}
                    badge={`+${(currentVehicle.passengerRate || 0) * validHours} грн`}
                    disabled={!currentVehicle.passengerRate}
                    disabledMessage="Поїздка з пасажиром (недоступно для одномісного мото)"
                  />

                  {/* Rider details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                    <div className="min-w-0">
                      <label htmlFor={desktopNameInputId} className="block font-label-caps text-xs uppercase text-text-muted font-bold mb-2">
                        Ваше ім&apos;я:
                      </label>
                      <input
                        id={desktopNameInputId}
                        type="text"
                        aria-required="true"
                        aria-invalid={Boolean(nameError)}
                        aria-label="Ваше ім'я"
                        value={clientName}
                        onChange={(e) => {
                          setClientName(e.target.value)
                          if (nameError) setNameError('')
                          if (errorMsg) setErrorMsg('')
                        }}
                        placeholder="Олександр"
                        className={`w-full max-w-full min-w-0 box-border block bg-surface-base border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-dim outline-none text-base md:text-sm transition-all ${
                          nameError
                            ? 'border-border-active ring-2 ring-border-active/25 bg-border-active/[0.03]'
                            : 'border-border-subtle focus:border-border-active focus:ring-1 focus:ring-border-active'
                        }`}
                      />
                      <FormFieldTooltip
                        message={nameError}
                        subtext="Як наш адміністратор може до вас звертатися?"
                      />
                    </div>
                    <div className="min-w-0">
                      <label htmlFor={desktopPhoneInputId} className="block font-label-caps text-xs uppercase text-text-muted font-bold mb-2">
                        Номер телефону:
                      </label>
                      <input
                        id={desktopPhoneInputId}
                        type="tel"
                        aria-required="true"
                        aria-invalid={Boolean(phoneError)}
                        aria-label="Номер телефону"
                        value={clientPhone}
                        onChange={handlePhoneChange}
                        onKeyDown={onPhoneKeyDown}
                        onFocus={handlePhoneFocusOrClick}
                        onClick={handlePhoneFocusOrClick}
                        placeholder="+380 (98) 000-00-00"
                        className={`w-full max-w-full min-w-0 box-border block bg-surface-base border rounded-xl px-4 py-3 text-text-primary font-mono placeholder:text-text-dim outline-none text-base md:text-sm transition-all ${
                          phoneError
                            ? 'border-border-active ring-2 ring-border-active/25 bg-border-active/[0.03]'
                            : 'border-border-subtle focus:border-border-active focus:ring-1 focus:ring-border-active'
                        }`}
                      />
                      <FormFieldTooltip
                        message={phoneError}
                        subtext="Формат: +380 (XX) XXX-XX-XX"
                      />
                    </div>
                  </div>

                  {/* Date and Cost Row - Balanced heights to prevent any vertical shift */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="min-w-0">
                      <label htmlFor={desktopDateInputId} className="block font-label-caps text-xs uppercase text-text-muted font-bold mb-2">
                        Бажана дата:
                      </label>
                      <div className="relative min-w-0">
                        <input
                          id={desktopDateInputId}
                          type="date"
                          min={todayDate}
                          aria-label="Бажана дата заїзду"
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className={`w-full max-w-full min-w-0 box-border block bg-surface-base border border-border-subtle rounded-xl px-4 py-3 focus:border-border-active focus:ring-1 focus:ring-border-active outline-none text-base md:text-sm transition-colors appearance-none ${
                            preferredDate ? 'text-text-primary' : 'text-text-muted'
                          }`}
                        />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <label className="block font-label-caps text-xs uppercase text-text-muted font-bold mb-2">
                        Розрахована сума:
                      </label>
                      <div className="w-full bg-surface-base border border-border-subtle rounded-xl px-4 py-3 flex items-center justify-between min-h-[48px]">
                        <span className="text-xs text-text-muted">Вартість заїзду:</span>
                        <span className="font-price-val text-xl font-black text-border-active">
                          {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} грн
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Optional Comment / Preferred Time Row */}
                  <div className="min-w-0">
                    <label htmlFor={desktopNotesInputId} className="block font-label-caps text-xs uppercase text-text-muted font-bold mb-2">
                      Побажання або зручний час (необов&apos;язково):
                    </label>
                    <input
                      id={desktopNotesInputId}
                      type="text"
                      aria-label="Побажання або зручний час"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Наприклад: бажано на 15:00, будемо компанією з 4-х осіб"
                      className="w-full max-w-full min-w-0 box-border block bg-surface-base border border-border-subtle rounded-xl px-4 py-3 text-text-primary placeholder:text-text-dim focus:border-border-active focus:ring-1 focus:ring-border-active outline-none text-base md:text-sm transition-colors"
                    />
                  </div>

                  <FormAlertBanner message={errorMsg} onDismiss={() => setErrorMsg('')} />

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-border-active hover:bg-brand-amber text-white font-headline-sm text-base uppercase font-bold py-4 rounded-xl transition-all ignition-glow flex items-center justify-center gap-2 disabled:opacity-50 select-none shadow-lg shadow-border-active/20 cursor-pointer"
                  >
                    <MaterialIcon className="">check</MaterialIcon>
                    <span>{isSubmitting ? 'Відправка...' : 'Підтвердити та забронювати'}</span>
                  </button>

                  {/* 1-Click Fast Booking Button */}
                  {onOpenOneClick && (
                    <div className="pt-2">
                      <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-border-subtle"></div>
                        <span className="flex-shrink mx-3 text-[11px] font-label-caps text-text-dim uppercase font-bold tracking-wider">
                          Або без калькулятора
                        </span>
                        <div className="flex-grow border-t border-border-subtle"></div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onOpenOneClick(currentVehicle.name)}
                        className="w-full py-3.5 bg-surface-panel hover:bg-surface-panel-elevated border border-border-active/50 hover:border-border-active text-border-active hover:text-brand-amber font-headline-sm text-sm uppercase font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-98 shadow-sm group cursor-pointer"
                      >
                        <MaterialIcon className="text-lg group-hover:scale-110 transition-transform text-border-active">
                          bolt
                        </MaterialIcon>
                        <span>Забронювати в 1 клік (тільки телефон)</span>
                      </button>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
