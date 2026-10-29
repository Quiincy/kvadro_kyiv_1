import React from 'react'
import { MaterialIcon } from '@/components/ui/MaterialIcon'
import { defaultReviews, ReviewItem } from '@/lib/defaultData'

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

interface ReviewsSectionProps {
  reviews?: ReviewItem[]
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const activeReviews = reviews && reviews.length > 0 ? reviews : defaultReviews

  return (
    <section id="reviews" className="scroll-mt-20 lg:scroll-mt-24 border-t border-b border-border-subtle relative bg-surface-base">
      {/* ===================== MOBILE VIEW (< md) ===================== */}
      <div className="md:hidden py-10 px-4 bg-surface-panel/30">
        <div className="max-w-md mx-auto space-y-5">
          <div>
            <span className="font-label-caps text-xs text-border-active uppercase font-bold tracking-wider">
              Реальні враження
            </span>
            <p className="font-headline-xl-mobile text-2xl font-black text-text-primary uppercase mt-1 leading-tight">
              Відгуки клієнтів
            </p>
          </div>

          <div className="space-y-3">
            {activeReviews.map((rev, i) => (
              <div key={i} className="bg-surface-panel p-4 rounded-xl border border-border-subtle space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-border-active flex items-center justify-center text-white font-bold text-xs shadow-sm">
                      {getInitials(rev.author)}
                    </div>
                    <span className="font-bold text-sm text-text-primary">{rev.author}</span>
                  </div>
                  <div className="flex text-border-active">
                    {[...Array(rev.rating || 5)].map((_, idx) => (
                      <MaterialIcon key={idx} className="text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</MaterialIcon>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  {rev.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===================== DESKTOP VIEW (>= md) ===================== */}
      <div className="hidden md:block py-20 bg-surface-base">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-label-caps text-label-caps text-border-active uppercase tracking-widest font-extrabold flex items-center justify-center gap-2">
              <MaterialIcon className="text-sm">stars</MaterialIcon>
              Реальні враження
            </span>
            <h2 className="font-headline-xl text-3xl md:text-headline-xl text-text-primary font-black uppercase mt-2">
              Відгуки <span className="text-border-active">наших клієнтів</span>
            </h2>
            <p className="font-body-md text-text-muted mt-3">
              Справжні відгуки після проходження лісових маршрутів у Дарницькому районі Києва.
            </p>
          </div>

          {/* Real Testimonial Cards from Payload CMS */}
          <div
            className={`grid grid-cols-1 gap-6 ${
              activeReviews.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'
            }`}
          >
            {activeReviews.map((rev, i) => (
              <div
                key={i}
                className="bg-surface-panel border border-border-subtle rounded-xl p-6 lg:p-8 flex flex-col justify-between hover:border-border-active/60 transition-all relative"
              >
                <div>
                  <div className="flex items-center gap-1 text-warning-caution mb-4">
                    {[...Array(rev.rating || 5)].map((_, idx) => (
                      <MaterialIcon key={idx} className="text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </MaterialIcon>
                    ))}
                  </div>
                  <p className="font-body-md text-text-primary text-sm leading-relaxed mb-6 italic">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
                  <div>
                    <span className="font-headline-sm text-sm font-bold text-text-primary block">{rev.author}</span>
                    <span className="font-body-sm text-xs text-text-dim">{rev.date || 'Нещодавно'}</span>
                  </div>
                  {rev.verified && (
                    <span className="font-label-caps text-[10px] text-border-active uppercase font-bold">Перевірено</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
