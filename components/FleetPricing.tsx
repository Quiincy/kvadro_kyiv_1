'use client'

import React from 'react'
import { MaterialIcon } from '@/components/ui/MaterialIcon'
import { defaultFleet, defaultSettings, FleetItem, formatPrice } from '@/lib/defaultData'

interface FleetPricingProps {
  fleet?: FleetItem[]
  settings?: typeof defaultSettings
  onSelectVehicle?: (vehicleTitle: string) => void
  onOpenOneClick?: (vehicleTitle: string) => void
}

export function FleetPricing({ fleet, settings, onSelectVehicle, onOpenOneClick }: FleetPricingProps) {
  const currentFleet = fleet && fleet.length > 0 ? fleet : defaultFleet
  const s = settings || defaultSettings

  const handleSelect = (title: string) => {
    if (onSelectVehicle) {
      onSelectVehicle(title)
    }
    const bookingEl = document.getElementById('booking')
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const getVehicleIcon = (item: FleetItem) => {
    if (item.icon === 'Flame') return 'speed'
    if (item.icon === 'Zap') return 'bolt'
    if (item.icon === 'Shield') return 'directions_car'
    if (item.id === 'buggy') return 'directions_car'
    return 'two_wheeler'
  }

  return (
    <section id="price" className="scroll-mt-20 lg:scroll-mt-24 bg-[#0B0E14] relative border-b border-border-subtle">
      <div id="prices" className="scroll-mt-20 lg:scroll-mt-24" />
      <div id="pricing" className="scroll-mt-20 lg:scroll-mt-24" />
      <div id="vehicles" className="scroll-mt-20 lg:scroll-mt-24" />

      {/* ===================== MOBILE PRICING (< md) ===================== */}
      <div className="md:hidden py-10 px-4">
        <div className="max-w-md mx-auto space-y-6">
          <div>
            <span className="font-label-caps text-xs text-border-active uppercase font-bold tracking-wider">
              Техпарк та тарифи
            </span>
            <p className="font-headline-xl-mobile text-2xl font-black text-text-primary uppercase mt-1 leading-tight">
              Ціни та техніка в Києві
            </p>
            <p className="font-body-sm text-xs text-text-muted mt-1">
              Прозорі тарифи без прихованих платежів з повним супроводом
            </p>
          </div>

          <div className="space-y-4">
            {currentFleet.map((item) => (
              <div
                key={item.id}
                className={`bg-surface-panel rounded-xl border p-4 relative overflow-hidden ${
                  item.isPopular
                    ? 'border-border-active ring-1 ring-border-active/40'
                    : 'border-border-subtle'
                }`}
              >
                {item.isPopular && (
                  <div className="absolute top-0 right-0 bg-border-active text-white text-[9px] font-bold px-2.5 py-0.5 rounded-bl uppercase font-label-caps tracking-wider">
                    {item.badge || 'Популярний вибір'}
                  </div>
                )}
                <div className="flex justify-between items-start mb-2">
                  <div>
                    {!item.isPopular && item.badge && (
                      <span className="font-label-caps text-[10px] text-text-dim uppercase tracking-wider font-bold block mb-0.5">
                        {item.badge}
                      </span>
                    )}
                    <p className="font-headline-md text-base text-text-primary font-bold">
                      {item.title}
                    </p>
                  </div>
                  {item.specs && item.specs[0] && (
                    <span className="bg-surface-panel-elevated text-xs font-mono px-2 py-0.5 rounded border border-border-subtle text-text-muted">
                      {item.specs[0]}
                    </span>
                  )}
                </div>

                <p className="font-body-sm text-xs text-text-muted mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Rates Grid */}
                {(() => {
                  const prices = [
                    item.price1h ? { label: '1 година', price: item.price1h, highlight: false } : null,
                    item.price2h ? { label: '2 години', price: item.price2h, highlight: true } : null,
                    item.price3h ? { label: '3 години', price: item.price3h, highlight: false } : null,
                  ].filter(Boolean) as { label: string; price: number; highlight: boolean }[]

                  return (
                    <div className={`grid ${prices.length === 3 ? 'grid-cols-3' : 'grid-cols-2'} gap-2 mb-3 bg-surface-base p-2.5 rounded-lg border border-border-subtle`}>
                      {prices.map((p, pIdx) => (
                        <div key={pIdx}>
                          <span className="text-[11px] text-text-dim block">{p.label}</span>
                          <span className={`font-price-val ${prices.length === 3 ? 'text-lg' : 'text-xl'} font-bold ${p.highlight ? 'text-border-active' : 'text-text-primary'}`}>
                            {formatPrice(p.price)}{' '}
                            <span className="text-xs font-normal text-text-dim">грн</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  )
                })()}

                {/* Passenger Info */}
                <div className="flex items-center justify-between text-xs text-text-muted pb-3 mb-3 border-b border-border-subtle">
                  <span className="flex items-center gap-1">
                    <MaterialIcon className="text-border-active text-sm">
                      {item.passengerPrice ? 'person_add' : 'person'}
                    </MaterialIcon>
                    {item.passengerPrice ? 'Пасажир на техніці:' : 'Формат:'}
                  </span>
                  <span className="font-bold text-text-primary">
                    {item.passengerPrice ? `+${item.passengerPrice} грн/год` : '1 райдер'}
                  </span>
                </div>

                {/* Features List */}
                {item.features && item.features.length > 0 && (
                  <ul className="space-y-1.5 text-xs text-text-muted mb-4">
                    {item.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <MaterialIcon className="text-border-active text-sm">
                          check_circle
                        </MaterialIcon>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="space-y-2 mt-auto pt-2">
                  <button
                    type="button"
                    onClick={() => handleSelect(item.title)}
                    className={`w-full h-11 rounded-lg text-center font-headline-sm text-xs uppercase tracking-wider flex items-center justify-center font-bold transition-all cursor-pointer ${
                      item.isPopular
                        ? 'bg-border-active text-white ignition-glow'
                        : 'bg-surface-panel-elevated hover:bg-border-active text-text-primary hover:text-white border border-border-subtle'
                    }`}
                  >
                    Забронювати {item.title}
                  </button>

                  {onOpenOneClick && (
                    <button
                      type="button"
                      onClick={() => onOpenOneClick(item.title)}
                      className="w-full h-10 bg-surface-base hover:bg-surface-panel-elevated border border-border-active/40 text-border-active text-xs font-label-caps uppercase font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <MaterialIcon className="text-sm">bolt</MaterialIcon>
                      <span>В 1 клік</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===================== DESKTOP PRICING (>= md) ===================== */}
      <div className="hidden md:block py-20 bg-surface-panel/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-label-caps text-label-caps text-border-active uppercase tracking-widest font-extrabold flex items-center justify-center gap-2">
              <MaterialIcon className="text-sm">price_change</MaterialIcon>
              Прозорий прайс без прихованих платежів
            </span>
            <h2 className="font-headline-xl text-3xl md:text-headline-xl text-text-primary font-black uppercase mt-2">
              Ціни та техніка в <span className="text-border-active">Києві</span>
            </h2>
            <p className="font-body-md text-text-muted mt-3">
              У вартість кожної прогулянки вже включено: бензин, захисне екіпірування, 10 хвилин навчання та супровід гіда.
            </p>
          </div>

          {/* Dynamic Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentFleet.map((item) => {
              const iconName = getVehicleIcon(item)
              return (
                <div
                  key={item.id}
                  className={`bg-surface-panel rounded-xl p-6 flex flex-col justify-between transition-all group relative ${
                    item.isPopular
                      ? 'border-2 border-border-active shadow-xl shadow-border-active/10'
                      : 'border border-border-subtle hover:border-border-active/60'
                  }`}
                >
                  {item.isPopular && item.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-border-active text-white font-label-caps text-[10px] uppercase font-black px-3 py-1 rounded-full tracking-wider shadow whitespace-nowrap">
                      {item.badge}
                    </div>
                  )}

                  <div className="flex flex-col">
                    {/* 1. Badge & Icon row: fixed height h-7 */}
                    <div className="flex items-center justify-between mb-4 h-7">
                      <span className="font-label-caps text-[11px] uppercase tracking-wider px-2.5 py-1 rounded bg-surface-panel-elevated text-brand-amber border border-border-subtle font-bold">
                        {item.badge || 'ПОВНИЙ ПРИВІД 4X4'}
                      </span>
                      <MaterialIcon className="text-border-active text-2xl shrink-0">
                        {iconName}
                      </MaterialIcon>
                    </div>

                    {/* 2. Title: fixed height h-8 */}
                    <h3 className="font-headline-lg text-xl font-bold uppercase text-text-primary h-8 flex items-center">
                      {item.title}
                    </h3>

                    {/* 3. Description: comfortable height h-[64px] with mb-6 margin */}
                    <p className="font-body-sm text-text-muted text-xs mt-2 mb-6 leading-relaxed h-[64px] flex items-start">
                      {item.description}
                    </p>

                    {/* 4. Rates Block: 4 consistent rows across all 4 cards */}
                    <div className="space-y-3 py-4 border-y border-border-subtle/80">
                      {/* Row 1: 1 hour */}
                      <div className="flex justify-between items-baseline h-8">
                        <span className="font-body-md text-sm text-text-muted">1 година</span>
                        {item.price1h ? (
                          <span className="font-price-val text-2xl font-black text-text-primary">
                            {formatPrice(item.price1h)}{' '}
                            <span className="text-xs font-normal text-text-dim">грн</span>
                          </span>
                        ) : (
                          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider px-2 py-0.5 rounded bg-surface-panel-elevated border border-border-subtle">
                            від 2-х годин
                          </span>
                        )}
                      </div>

                      {/* Row 2: 2 hours */}
                      <div className="flex justify-between items-baseline h-8">
                        <span className="font-body-md text-sm text-text-muted">2 години</span>
                        <span className="font-price-val text-2xl font-black text-border-active">
                          {formatPrice(item.price2h)}{' '}
                          <span className="text-xs font-normal text-text-dim">грн</span>
                        </span>
                      </div>

                      {/* Row 3: 3 hours */}
                      <div className="flex justify-between items-baseline h-8">
                        <span className="font-body-md text-sm text-text-muted">3 години</span>
                        {item.price3h ? (
                          <span className="font-price-val text-2xl font-black text-text-primary">
                            {formatPrice(item.price3h)}{' '}
                            <span className="text-xs font-normal text-text-dim">грн</span>
                          </span>
                        ) : (
                          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider px-2 py-0.5 rounded bg-surface-panel-elevated border border-border-subtle">
                            за домовленістю
                          </span>
                        )}
                      </div>

                      {/* Row 4: Passenger */}
                      <div className="flex justify-between items-baseline h-8 text-xs text-text-muted pt-2.5 border-t border-border-subtle/40">
                        <span>Пасажир (другий вершник)</span>
                        <span className="font-semibold text-text-primary">
                          {item.passengerPrice ? `+${item.passengerPrice} грн/год` : 'Не передбачено'}
                        </span>
                      </div>
                    </div>

                    {/* 5. Features Checklist: aligned start and min-height */}
                    {item.features && item.features.length > 0 && (
                      <ul className="mt-6 space-y-2.5 font-body-sm text-xs text-text-muted min-h-[120px]">
                        {item.features.map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <MaterialIcon className="text-border-active text-sm shrink-0">
                              check_circle
                            </MaterialIcon>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Unified Action Buttons Container: pinned to bottom */}
                  <div className="mt-auto pt-6 space-y-2 w-full">
                    <button
                      type="button"
                      onClick={() => handleSelect(item.title)}
                      className={`w-full h-11 flex items-center justify-center text-center font-headline-sm text-xs font-bold uppercase rounded-lg border transition-all cursor-pointer ${
                        item.isPopular
                          ? 'bg-border-active hover:bg-brand-amber text-white border-border-active ignition-glow'
                          : 'bg-surface-panel-elevated hover:bg-border-active text-text-primary hover:text-white border-border-subtle hover:border-border-active'
                      }`}
                    >
                      Забронювати
                    </button>

                    {onOpenOneClick && (
                      <button
                        type="button"
                        onClick={() => onOpenOneClick(item.title)}
                        className="w-full h-10 bg-surface-base hover:bg-surface-panel-elevated border border-border-active/40 hover:border-border-active text-border-active hover:text-white text-xs font-label-caps uppercase font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <MaterialIcon className="text-sm">bolt</MaterialIcon>
                        <span>В 1 клік</span>
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Price Policy Callout Box */}
          <div className="mt-10 p-6 rounded-xl bg-surface-panel border border-border-subtle flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-border-active/10 border border-border-active/30 flex items-center justify-center text-border-active shrink-0">
                <MaterialIcon className="text-2xl">groups</MaterialIcon>
              </div>
              <div>
                <p className="font-headline-sm text-base text-text-primary font-bold uppercase">
                  Індивідуальний VIP-формат без сторонніх
                </p>
                <p className="font-body-sm text-text-muted">
                  За індивідуальну прогулянку без сторонньої групи доплачується{' '}
                  <span className="text-text-primary font-bold">
                    +{s.individualSurchargePerHour || 1000} гривень / 1 година
                  </span>{' '}
                  за всю Вашу компанію.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                className="px-4 py-2.5 rounded-lg bg-surface-panel-elevated border border-border-subtle text-text-primary text-xs font-headline-sm font-bold uppercase hover:border-border-active flex items-center gap-2 transition-all"
                href={`tel:${s.phoneRaw}`}
              >
                <MaterialIcon className="text-border-active text-base">call</MaterialIcon>
                <span>Уточнити деталі</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
