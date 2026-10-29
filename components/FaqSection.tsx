'use client'

import React from 'react'
import { MaterialIcon } from '@/components/ui/MaterialIcon'
import { defaultFaqs, FaqItem } from '@/lib/defaultData'

interface FaqSectionProps {
  faqs?: FaqItem[]
}

export function FaqSection({ faqs }: FaqSectionProps) {
  const activeFaqs = faqs && faqs.length > 0 ? faqs : defaultFaqs

  const fallbackBadges = [
    'Гід для початківців',
    'Все включено',
    'Ідеї для свят',
    'Двомісні тури та діти',
    'Екіпірування та погода',
    'Бонусна програма',
  ]

  const getCardAction = (faq: FaqItem, index: number): { label: string; href: string } => {
    const qLower = faq.q.toLowerCase()
    if (qLower.includes('сертифікат') || qLower.includes('знижк')) {
      return { label: 'Обрати сертифікат', href: '#certificates' }
    }
    if (qLower.includes('вартість') || qLower.includes('входить')) {
      return { label: 'Дивитись техніку та ціни', href: '#pricing' }
    }
    if (qLower.includes('корпоратив') || qLower.includes('народження') || qLower.includes('компані')) {
      return { label: 'Забронювати для компанії', href: '#booking' }
    }
    if (qLower.includes('вік') || qLower.includes('вдвох') || qLower.includes('пасажир')) {
      return { label: 'Розрахувати вартість', href: '#booking' }
    }
    if (qLower.includes('дощ') || qLower.includes('одяг')) {
      return { label: 'Переглянути галерею трас', href: '#routes' }
    }
    if (qLower.includes('прав')) {
      return { label: 'Як проходить інструктаж', href: '#stages' }
    }
    return index % 2 === 0
      ? { label: 'Забронювати заїзд', href: '#booking' }
      : { label: 'Дивитись прайс', href: '#pricing' }
  }

  return (
    <section id="faq" className="scroll-mt-20 lg:scroll-mt-24 border-b border-border-subtle relative bg-surface-base">
      {/* ===================== MOBILE VIEW (< md) ===================== */}
      <div className="md:hidden py-10 px-4">
        <div className="max-w-md mx-auto space-y-5">
          <div>
            <span className="font-label-caps text-label-caps text-border-active uppercase font-bold tracking-wider">
              Часті питання
            </span>
            <p className="font-headline-xl-mobile text-headline-xl-mobile font-black text-text-primary uppercase mt-1 leading-tight">
              Корисні поради райдерам
            </p>
          </div>

          <div className="space-y-2.5">
            {activeFaqs.map((faq, i) => (
              <details key={i} className="bg-surface-panel rounded-lg border border-border-subtle p-3 group" open={i === 0}>
                <summary className="font-headline-sm text-xs font-bold text-text-primary cursor-pointer list-none flex justify-between items-center select-none">
                  <span>{faq.q}</span>
                  <MaterialIcon className="text-border-active text-base transition-transform group-open:rotate-180">
                    expand_more
                  </MaterialIcon>
                </summary>
                <p className="text-xs text-text-muted mt-2 pt-2 border-t border-border-subtle leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* ===================== DESKTOP VIEW (>= md) ===================== */}
      <div className="hidden md:block py-20 bg-surface-panel/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="font-label-caps text-label-caps text-border-active uppercase tracking-widest font-extrabold flex items-center gap-2">
                <MaterialIcon className="text-sm">article</MaterialIcon>
                Корисна інформація
              </span>
              <h2 className="font-headline-xl text-3xl md:text-headline-xl text-text-primary font-black uppercase mt-2">
                Часті питання та поради для райдерів
              </h2>
            </div>
            <p className="font-body-sm text-text-muted max-w-sm">
              Відповіді на популярні запитання про прокат, права, екіпірування та підготовку до поїздки.
            </p>
          </div>

          {/* Unified Symmetric 3x2 FAQ & Tips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeFaqs.map((faq, i) => {
              const action = getCardAction(faq, i)
              const badge = faq.articleBadge || fallbackBadges[i % fallbackBadges.length]
              return (
                <div
                  key={i}
                  className="bg-surface-panel border border-border-subtle rounded-xl p-6 hover:border-border-active transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="font-label-caps text-[10px] uppercase text-brand-amber font-bold tracking-wider block mb-2">
                      {badge}
                    </span>
                    <h3 className="font-headline-sm text-base text-text-primary font-bold group-hover:text-border-active transition-colors leading-snug">
                      {faq.q}
                    </h3>
                    <p className="font-body-sm text-text-muted text-xs mt-2.5 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                  <a
                    className="mt-6 inline-flex items-center gap-2 text-xs font-headline-sm font-bold text-border-active hover:text-brand-amber uppercase transition-colors"
                    href={action.href}
                  >
                    <span>{action.label}</span>
                    <MaterialIcon className="text-xs group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </MaterialIcon>
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
