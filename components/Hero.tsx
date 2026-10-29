import React from 'react'
import Image from 'next/image'
import { ArrowRight, MapPin } from 'lucide-react'
import { defaultSettings } from '@/lib/defaultData'
import { InstagramIcon } from './InstagramIcon'

export function Hero({ settings }: { settings?: typeof defaultSettings }) {
  const s = settings || defaultSettings

  return (
    <>
      {/* ===================== MOBILE HERO (< lg) ===================== */}
      <section className="lg:hidden relative pt-5 pb-8 px-4 technical-grid overflow-hidden border-b border-border-subtle">
        {/* Glow ambient backdrop */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-border-active/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md mx-auto relative z-10 flex flex-col gap-4">
          {/* Trailhead Badge */}
          <div className="inline-flex items-center gap-2 self-start bg-surface-panel px-3 py-1.5 rounded-lg border border-border-subtle">
            <span className="flex h-2 w-2 rounded-full bg-border-active animate-ping" />
            <span className="font-label-caps text-[11px] text-border-active uppercase font-bold tracking-wide">
              Локація: {s.addressShort || 'Київ, вул. Лісова 76К'}
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-2">
            <p className="font-display font-black text-3xl text-text-primary uppercase tracking-tight leading-tight">
              Прокат квадро, мото, баггі в Києві
            </p>
            <p className="font-body-md text-xs sm:text-sm text-text-muted leading-relaxed">
              Прогулянки сімейні, групові, індивідуальні лісовими трасами Бортничів. Драйв, яскраві емоції та повна безпека.
            </p>
          </div>

          {/* Hero Action Buttons */}
          <div className="flex flex-col gap-2.5 pt-1">
            <a
              className="w-full text-center py-3.5 px-6 rounded-lg bg-border-active hover:bg-brand-amber text-text-primary font-label-caps text-xs uppercase tracking-wider ignition-glow active:scale-98 transition-all font-bold"
              href="#booking"
            >
              Забронювати заїзд
            </a>
            <a
              className="w-full text-center py-3 px-6 rounded-lg bg-surface-panel border border-border-subtle text-text-primary hover:border-border-active font-label-caps text-xs uppercase tracking-wider transition-all font-semibold"
              href="#price"
            >
              Прайс-лист
            </a>
          </div>

          {/* Trust Badges Bar */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="bg-surface-panel p-2.5 rounded-lg border border-border-subtle text-center flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-border-active text-xl mb-1">timer</span>
              <span className="font-label-caps text-[10px] text-text-primary leading-tight font-bold">
                10 хв навчання
              </span>
            </div>
            <div className="bg-surface-panel p-2.5 rounded-lg border border-border-subtle text-center flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-border-active text-xl mb-1">dry_cleaning</span>
              <span className="font-label-caps text-[10px] text-text-primary leading-tight font-bold">
                Чисте екіпо
              </span>
            </div>
            <div className="bg-surface-panel p-2.5 rounded-lg border border-border-subtle text-center flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-border-active text-xl mb-1">local_cafe</span>
              <span className="font-label-caps text-[10px] text-text-primary leading-tight font-bold">
                Безкоштовні напої
              </span>
            </div>
          </div>

          {/* Hero Feature Visual Card */}
          <div className="relative rounded-xl overflow-hidden border border-border-subtle shadow-xl mt-1 group">
            <div className="relative w-full h-56">
              <Image
                src="/assets/gallery/6j.webp"
                alt="Прокат квадроциклів у лісі Бортничі"
                width={600}
                height={338}
                sizes="(max-width: 768px) 100vw, 500px"
                className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface-base via-surface-base/30 to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-label-caps text-border-active uppercase block font-bold">
                  Екстремальний відпочинок
                </span>
                <p className="font-headline-sm text-xs text-text-primary font-bold">
                  Ліс, піщані бархани та схили
                </p>
              </div>
              <span className="bg-surface-panel-elevated/90 backdrop-blur px-2.5 py-1 rounded text-[11px] font-mono text-text-primary border border-border-subtle font-bold">
                4x4 ПРИВІД
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== DESKTOP HERO (>= lg) ===================== */}
      <section className="hidden lg:block relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-border-subtle">
        {/* Atmospheric Ambient Dirt/Laser Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-border-active/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Hero Copy */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-6">
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-surface-panel border border-border-subtle">
                <span className="w-2.5 h-2.5 rounded-full bg-border-active animate-ping" />
                <span className="font-label-caps text-label-caps uppercase text-border-active font-extrabold tracking-widest">
                  Екстрим прокат №1 у Києві
                </span>
                <span className="text-text-dim text-xs">•</span>
                <span className="font-label-caps text-xs text-text-muted uppercase">Дарниця, Лісова 76К</span>
              </div>

              <h1 className="font-display-hero text-3xl md:text-5xl lg:text-display-hero uppercase tracking-tight text-text-primary leading-tight font-black">
                Прокат{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-border-active to-brand-amber">
                  квадро, мото, баггі
                </span>{' '}
                в Києві
              </h1>

              <p className="font-body-lg text-body-lg text-text-muted max-w-2xl">
                Прогулянки сімейні, групові, індивідуальні лісовими трасами Бортничів. Потужна техніка, безпечні піщані карʼєри, мальовничі пагорби та справжній драйв для кожного.
              </p>

              {/* CTAs & Action Pipeline */}
              <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
                <a
                  className="w-full sm:w-auto bg-border-active hover:bg-brand-amber text-white font-headline-sm text-base uppercase font-extrabold px-8 py-4 rounded-lg tracking-wider transition-all ignition-glow flex items-center justify-center gap-3"
                  href="#booking"
                >
                  <span>Забронювати заїзд</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </a>

                <a
                  className="w-full sm:w-auto bg-surface-panel hover:bg-surface-panel-elevated border border-border-subtle hover:border-border-active text-text-primary font-headline-sm text-base px-6 py-4 rounded-lg transition-all flex items-center justify-center gap-2"
                  href="#pricing"
                >
                  <span className="material-symbols-outlined text-border-active">payments</span>
                  <span>Прайс-лист</span>
                </a>

                <a
                  className="w-full sm:w-auto p-4 rounded-lg bg-surface-panel border border-border-subtle hover:border-border-active text-text-primary hover:text-brand-amber transition-all flex items-center justify-center gap-2"
                  href={s.instagram}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-border-active">photo_camera</span>
                  <span className="font-headline-sm text-sm">@{s.instagramUsername || 'kvadro_kyiv1'}</span>
                </a>
              </div>

              {/* Quick Highlight Trophies */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border-subtle w-full">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-panel border border-border-subtle flex items-center justify-center text-border-active">
                    <span className="material-symbols-outlined text-xl">timer</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-sm font-bold text-text-primary">10 хв</span>
                    <span className="font-body-sm text-xs text-text-dim">Безкоштовне навчання</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-panel border border-border-subtle flex items-center justify-center text-border-active">
                    <span className="material-symbols-outlined text-xl">sports_motorsports</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-sm font-bold text-text-primary">Чисте екіпірування</span>
                    <span className="font-body-sm text-xs text-text-dim">Джерсі, окуляри, шолом</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-panel border border-border-subtle flex items-center justify-center text-border-active">
                    <span className="material-symbols-outlined text-xl">local_cafe</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-sm font-bold text-text-primary">Бонус</span>
                    <span className="font-body-sm text-xs text-text-dim">Безкоштовні напої</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Visual Showcase Bento */}
            <div className="lg:col-span-5 relative">
              <div className="relative bg-surface-panel border border-border-subtle rounded-xl p-3 shadow-2xl overflow-hidden group">
                <div className="relative h-[420px] rounded-lg overflow-hidden">
                  <Image
                    src="/assets/gallery/6j.webp"
                    alt="Прокат квадроциклів у лісі Бортничі"
                    width={600}
                    height={420}
                    sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 45vw, 520px"
                    className="w-full h-[420px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-base via-transparent to-transparent pointer-events-none" />

                  {/* Brand Badge Overlay */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-base/80 backdrop-blur-md border border-border-subtle">
                    <div className="w-6 h-6 relative overflow-hidden">
                      <Image src="/assets/logo.webp" alt="Логотип" width={24} height={24} className="object-contain" />
                    </div>
                    <span className="font-headline-sm text-xs font-bold uppercase tracking-wider text-text-primary">
                      KVADRO_KYIV1
                    </span>
                  </div>

                  {/* Status Tag */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-surface-panel/95 backdrop-blur-md border border-border-subtle flex items-center justify-between">
                    <div>
                      <span className="font-label-caps text-xs text-brand-amber uppercase tracking-wider block font-bold">
                        Локація відкрита щодня
                      </span>
                      <span className="font-headline-sm text-base text-text-primary font-bold">
                        Київ, вул. Лісова 76К
                      </span>
                    </div>
                    <a
                      className="px-3 py-2 rounded bg-border-active/20 text-border-active border border-border-active hover:bg-border-active hover:text-white transition-all text-xs font-headline-sm font-bold uppercase"
                      href="#location"
                    >
                      Маршрут
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

