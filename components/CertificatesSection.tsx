'use client'

import React from 'react'
import { MaterialIcon } from '@/components/ui/MaterialIcon'
import { Gift, Check, Send, Sparkles, Truck, Download, ShieldCheck, ArrowRight } from 'lucide-react'
import { defaultSettings, defaultFleet, FleetItem, formatPrice } from '@/lib/defaultData'
import { GiftCard3D } from '@/components/GiftCard3D'

interface CertificatesSectionProps {
  fleet?: FleetItem[]
  settings?: typeof defaultSettings
  onOpenOneClick?: (itemTitle: string) => void
}

export function CertificatesSection({ fleet, settings, onOpenOneClick }: CertificatesSectionProps) {
  const activeFleet = fleet && fleet.length > 0 ? fleet : defaultFleet

  const handleOrderCertificate = (nominal: number) => {
    if (onOpenOneClick) {
      onOpenOneClick(`Подарунковий сертифікат на ${nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₴ (-10% бонус)`)
    } else {
      const el = document.getElementById('booking')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section id="certificates" className="scroll-mt-20 lg:scroll-mt-24 border-t border-b border-border-subtle relative bg-surface-base">
      {/* ===================== MOBILE VIEW (< md) ===================== */}
      <div className="md:hidden py-10 px-4 bg-surface-panel/40">
        <div className="max-w-md mx-auto space-y-6">
          <div>
            <span className="font-label-caps text-xs text-border-active uppercase font-bold tracking-wider">
              Ідеальний подарунок
            </span>
            <p className="font-headline-xl-mobile text-2xl font-black text-text-primary uppercase mt-1 leading-tight">
              Подарункові сертифікати 🎁
            </p>
            <p className="font-body-sm text-xs text-text-muted mt-1">
              Дійсний 1 рік. Щоденна доставка «Новою поштою» або миттєвий електронний PDF.
            </p>
          </div>

          {/* Interactive 3D Card for Mobile */}
          <GiftCard3D onOrderCertificate={handleOrderCertificate} />

          {/* Key Advantages */}
          <div className="p-4 rounded-xl bg-surface-panel border border-border-subtle space-y-2.5 text-xs text-text-muted">
            <div className="flex items-center gap-2">
              <MaterialIcon className="text-border-active text-base">loyalty</MaterialIcon>
              <span>Довічна знижкова картка <strong className="text-text-primary">-10% на всі наступні заїзди</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <MaterialIcon className="text-border-active text-base">local_shipping</MaterialIcon>
              <span>Фірмовий тубус + відправка у день замовлення</span>
            </div>
            <div className="flex items-center gap-2">
              <MaterialIcon className="text-border-active text-base">verified</MaterialIcon>
              <span>Можна обрати будь-яку техніку або індивідуальну суму</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== DESKTOP VIEW (>= md) ===================== */}
      <div className="hidden md:block py-20 bg-surface-base relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 bg-brand-amber/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="bg-gradient-to-br from-surface-panel to-surface-panel-elevated border border-border-subtle rounded-2xl p-8 lg:p-12 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Voucher Highlights */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-border-active/15 border border-border-active/40 text-border-active text-xs font-label-caps uppercase font-bold">
                  <MaterialIcon className="text-sm">redeem</MaterialIcon>
                  Ідеальний подарунок емоцій
                </div>
                <h2 className="font-headline-xl text-3xl md:text-headline-xl text-text-primary font-black uppercase">
                  Подарункові <span className="text-border-active">сертифікати</span> 🎁
                </h2>
                <p className="font-body-lg text-text-muted">
                  Дійсний подарунковий сертифікат <strong className="text-text-primary font-semibold">1 рік з моменту придбання</strong>. Сертифікати відправляємо щодня «Новою поштою» у подарунковій преміум-коробці з тубусом, доступні в електронному форматі PDF, а також доступний самовивіз у м. Київ.
                </p>

                {/* Permanent Bonus Feature Box */}
                <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex items-start gap-3">
                  <div className="p-2 rounded bg-brand-amber/20 text-brand-amber shrink-0">
                    <MaterialIcon className="text-xl">loyalty</MaterialIcon>
                  </div>
                  <div>
                    <p className="font-headline-sm text-sm text-text-primary font-bold">
                      Постійний бонус у кожному сертифікаті:
                    </p>
                    <p className="font-body-sm text-text-muted text-xs mt-0.5">
                      У кожному сертифікаті на Вас чекає приємний бонус —{' '}
                      <span className="text-border-active font-bold">знижкова картка -10%</span> на всі наступні прогулянки, яка діє на постійній основі без терміну дії!
                    </p>
                  </div>
                </div>

                {/* Mini Price Table for Certificates */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-body-sm border border-border-subtle rounded-lg overflow-hidden">
                    <thead className="bg-surface-base text-text-muted font-label-caps uppercase">
                      <tr>
                        <th className="p-3">Техніка</th>
                        <th className="p-3">1 година</th>
                        <th className="p-3">2 години</th>
                        <th className="p-3">3 години</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle bg-surface-panel/80 text-text-primary">
                      {activeFleet.map((v) => (
                        <tr key={v.id}>
                          <td className="p-3 font-semibold">{v.title}</td>
                          <td className="p-3 text-border-active font-bold">
                            {v.price1h ? `${formatPrice(v.price1h)} грн` : '—'}
                          </td>
                          <td className="p-3">
                            {v.price2h ? `${formatPrice(v.price2h)} грн` : '—'}
                          </td>
                          <td className="p-3 text-text-dim">
                            {v.price3h ? `${formatPrice(v.price3h)} грн` : '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Info Badges */}
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <span className="flex items-center gap-1.5 text-xs text-text-dim font-label-caps uppercase">
                    <MaterialIcon className="text-border-active text-base">local_shipping</MaterialIcon>
                    Відправка у день замовлення
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-text-dim font-label-caps uppercase">
                    <MaterialIcon className="text-emerald-400 text-base">verified</MaterialIcon>
                    Дійсний 365 днів
                  </span>
                </div>
              </div>

              {/* Right: Interactive 3D Luxury Gift Card Mockup */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <GiftCard3D onOrderCertificate={handleOrderCertificate} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
