import React from 'react'
import Image from 'next/image'
import { Calendar, MapPin, ShieldCheck, Award, Compass, Coffee, ArrowRight } from 'lucide-react'
import { defaultSteps, StepItem } from '@/lib/defaultData'

const iconMap: Record<string, React.ReactNode> = {
  Calendar: <Calendar className="w-5 h-5 text-[#FF5722]" />,
  MapPin: <MapPin className="w-5 h-5 text-[#FF5722]" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#FF5722]" />,
  Award: <Award className="w-5 h-5 text-[#FF5722]" />,
  Compass: <Compass className="w-5 h-5 text-[#FF5722]" />,
  Coffee: <Coffee className="w-5 h-5 text-[#FF5722]" />,
}

export function StepsSection({ steps }: { steps?: StepItem[] }) {
  const currentSteps = steps && steps.length > 0 ? steps : defaultSteps
  return (
    <section id="stages" className="scroll-mt-20 lg:scroll-mt-24 border-t border-b border-border-subtle relative bg-surface-base">
      <div id="steps" className="scroll-mt-20 lg:scroll-mt-24" />
      <div id="tours" className="scroll-mt-20 lg:scroll-mt-24" />
      {/* ===================== MOBILE STEPPER (< md) ===================== */}
      <div className="md:hidden py-10 px-4 bg-surface-panel/40">
        <div className="max-w-md mx-auto space-y-6">
          <div>
            <span className="font-label-caps text-xs text-border-active uppercase font-bold tracking-wider">
              Маршрут & Організація
            </span>
            <p className="font-headline-xl-mobile text-2xl font-black text-text-primary uppercase mt-1 leading-tight">
              Як проходить прогулянка в KVADRO_KYIV1
            </p>
            <p className="font-body-sm text-xs text-text-muted mt-1">
              6 простих кроків до яскравих вражень на лісових трасах
            </p>
          </div>

          {/* Vertical Stepper List */}
          <div className="relative pl-6 space-y-5 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-border-subtle">
            {currentSteps.map((step) => (
              <div key={step.number} className="relative flex items-start gap-4">
                <div className="absolute -left-6 top-0 w-6 h-6 rounded-full bg-surface-panel-elevated border-2 border-border-active flex items-center justify-center">
                  <span className="font-headline-sm text-[11px] font-bold text-border-active">
                    {step.number}
                  </span>
                </div>
                <div className="bg-surface-panel p-3.5 rounded-lg border border-border-subtle w-full">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-headline-sm text-sm font-bold text-text-primary">
                      {step.title}
                    </p>
                    <span className="text-[10px] font-bold text-border-active uppercase">
                      {step.badge}
                    </span>
                  </div>
                  <p className="font-body-sm text-text-muted text-xs leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <a
            className="block text-center py-3 bg-surface-panel border border-border-active text-border-active font-label-caps text-xs uppercase rounded-lg hover:bg-border-active hover:text-text-primary transition-all font-bold"
            href="#booking"
          >
            Забронювати заїзд
          </a>
        </div>
      </div>

      {/* ===================== DESKTOP GRID (>= md) ===================== */}
      <div className="hidden md:block py-20 bg-surface-base relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="font-label-caps text-label-caps text-border-active uppercase tracking-widest font-extrabold flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">route</span>
                Покроковий процес
              </span>
              <h2 className="font-headline-xl text-3xl md:text-headline-xl text-text-primary font-black uppercase mt-2">
                Як проходить прогулянка в <span className="text-border-active">KVADRO_KYIV1</span>
              </h2>
            </div>
            <p className="font-body-md text-text-muted max-w-md">
              Жодного складного досвіду не потрібно. Ми беремо на себе підготовку, інструктаж та екіпірування, щоб ви отримали 100% драйву.
            </p>
          </div>

          {/* Dynamic Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentSteps.map((step) => {
              const icons: Record<string, string> = {
                '01': 'calendar_month',
                '02': 'pin_drop',
                '03': 'checkroom',
                '04': 'sports_score',
                '05': 'forest',
                '06': 'celebration',
              }
              const iconName = icons[step.number] || 'sports_motorsports'
              return (
                <div
                  key={step.number}
                  className="bg-surface-panel border border-border-subtle hover:border-border-active/70 rounded-xl p-6 transition-all duration-300 relative group flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-lg bg-surface-panel-elevated border border-border-subtle flex items-center justify-center text-border-active group-hover:border-border-active transition-colors">
                      <span className="material-symbols-outlined text-2xl">{iconName}</span>
                    </div>
                    <span className="font-display-hero text-2xl font-black text-text-dim/40 group-hover:text-border-active transition-colors">
                      {step.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-text-primary uppercase mb-2 font-bold">
                      {step.title}
                    </h3>
                    <p className="font-body-md text-text-muted text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border-subtle/60 flex items-center text-xs text-brand-amber font-label-caps uppercase font-bold">
                    <span>{step.badge}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Action Banner Under Steps */}
          <div className="mt-12 p-6 rounded-xl bg-surface-panel-elevated border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 relative overflow-hidden hidden sm:block shrink-0">
                <Image alt="Логотип" className="w-12 h-12 object-contain" src="/assets/logo.webp" width={48} height={48} />
              </div>
              <div>
                <p className="font-headline-sm text-base text-text-primary font-bold">
                  Готові відчути потужність мотору?
                </p>
                <p className="font-body-sm text-text-muted text-sm">
                  Оберіть зручний час сьогодні та забронюйте індивідуальний або груповий заїзд.
                </p>
              </div>
            </div>
            <a
              className="whitespace-nowrap bg-border-active hover:bg-brand-amber text-white font-headline-sm text-sm uppercase font-bold px-6 py-3 rounded-lg transition-all ignition-glow flex items-center gap-2"
              href="#booking"
            >
              <span>Забронювати прогулянку</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

