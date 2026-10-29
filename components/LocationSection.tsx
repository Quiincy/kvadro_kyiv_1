import React from 'react'
import { MaterialIcon } from '@/components/ui/MaterialIcon'
import { MapPin, Navigation, Coffee, Phone, Compass, Trees } from 'lucide-react'
import { defaultSettings } from '@/lib/defaultData'

interface LocationSectionProps {
  settings?: typeof defaultSettings
}

export function LocationSection({ settings }: LocationSectionProps) {
  const currentSettings = settings || defaultSettings

  return (
    <section id="location" className="scroll-mt-20 lg:scroll-mt-24 border-b border-border-subtle relative bg-surface-base">
      {/* ===================== MOBILE VIEW (< md) ===================== */}
      <div className="md:hidden py-10 px-4">
        <div className="max-w-md mx-auto space-y-5">
          <div>
            <span className="font-label-caps text-xs text-border-active uppercase font-bold tracking-wider">
              Зручний доїзд
            </span>
            <p className="font-headline-xl-mobile text-2xl font-black text-text-primary uppercase mt-1 leading-tight">
              Ми знаходимось у Києві
            </p>
            <p className="font-body-sm text-xs text-text-muted mt-1">
              {currentSettings.addressShort}
            </p>
          </div>

          {/* Location Description */}
          <div className="bg-surface-panel p-4 rounded-xl border border-border-subtle space-y-3 text-xs text-text-muted">
            <p className="text-text-primary font-medium leading-relaxed">
              Лісова місцевість. Ліс великий та безпечний! По дорозі на Вас чекають: гірки, схили, піски, підйоми та чудові фотозони.
            </p>
            <div className="flex items-center gap-2 text-border-active font-semibold pt-1">
              <MaterialIcon className="text-base">local_bar</MaterialIcon>
              <span>Бонус після поїздки: {currentSettings.freeDrinksText}</span>
            </div>
          </div>

          {/* Map Container */}
          <div className="relative rounded-xl overflow-hidden border border-border-subtle min-h-[220px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2543.9996874877015!2d30.71088247655339!3d50.38520437157981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTDCsDIzJzA2LjciTiAzMMKwNDInNDguNSJF!5e0!3m2!1suk!2sua!4v1699540795012!5m2!1suk!2sua"
              width="100%"
              height="220"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(90%)' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Локація на карті"
            />
            <div className="absolute inset-0 bg-surface-base/30 backdrop-blur-[1px] flex items-center justify-center p-4 pointer-events-none">
              <a
                className="px-4 py-2.5 bg-surface-panel-elevated/95 border border-border-active rounded-lg text-text-primary font-label-caps text-xs uppercase flex items-center gap-2 ignition-glow hover:bg-border-active transition-all pointer-events-auto"
                href={currentSettings.googleMapsUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <MaterialIcon className="text-border-active text-sm">near_me</MaterialIcon>
                <span>Відкрити на карті Google</span>
              </a>
            </div>
          </div>

          {/* 2 Stats Cards */}
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-3 bg-surface-panel rounded-lg border border-border-subtle">
              <span className="text-xs text-text-dim block">Графік роботи</span>
              <span className="font-bold text-text-primary text-xs">{currentSettings.workingHours}</span>
            </div>
            <div className="p-3 bg-surface-panel rounded-lg border border-border-subtle">
              <span className="text-xs text-text-dim block">Парковка</span>
              <span className="font-bold text-text-primary text-xs">Безкоштовна на базі</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== DESKTOP VIEW (>= md) ===================== */}
      <div className="hidden md:block py-20 bg-surface-panel/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Pine Forest Description */}
            <div className="lg:col-span-6 space-y-6">
              <span className="font-label-caps text-label-caps text-border-active uppercase tracking-widest font-extrabold flex items-center gap-2">
                <MaterialIcon className="text-sm">navigation</MaterialIcon>
                Локація та траса
              </span>
              <h2 className="font-headline-xl text-3xl md:text-headline-xl text-text-primary font-black uppercase">
                Ми знаходимось в <span className="text-border-active">м. Київ</span>
              </h2>
              <div className="p-4 rounded-xl bg-surface-panel border border-border-active/40 text-border-active font-headline-sm text-lg font-bold">
                {currentSettings.address}
              </div>
              <p className="font-body-lg text-text-muted">
                <strong className="text-text-primary font-semibold">Лісова місцевість. Ліс великий та безпечний!</strong> По дорозі на Вас чекають: круті гірки, піщані схили, рівнинні простріли, складні підйоми та мальовничі фотозони, де Ви зможете зробити яскраві фото на пам&apos;ять.
              </p>

              {/* Free Drinks Card Callout */}
              <div className="p-5 rounded-xl bg-surface-panel-elevated border border-border-subtle flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-brand-amber/20 text-brand-amber flex items-center justify-center shrink-0">
                  <MaterialIcon className="text-2xl">local_bar</MaterialIcon>
                </div>
                <div>
                  <p className="font-headline-sm text-sm text-text-primary font-bold uppercase">
                    Бонус від нашої компанії:
                  </p>
                  <p className="font-body-sm text-text-muted text-xs mt-0.5">
                    {currentSettings.freeDrinksText}
                  </p>
                </div>
              </div>

              {/* Navigation Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  className="bg-border-active hover:bg-brand-amber text-white font-headline-sm text-xs uppercase font-bold px-6 py-3.5 rounded-lg transition-all ignition-glow flex items-center gap-2"
                  href={currentSettings.googleMapsUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <MaterialIcon className="text-base">near_me</MaterialIcon>
                  <span>Відкрити в Google Maps</span>
                </a>
                <a
                  className="p-3 rounded-lg bg-surface-panel border border-border-subtle hover:border-border-active text-text-primary flex items-center gap-2 font-headline-sm text-xs uppercase font-bold transition-all"
                  href={`tel:${currentSettings.phoneRaw}`}
                >
                  <MaterialIcon className="text-border-active">call</MaterialIcon>
                  <span>Запитати маршрут</span>
                </a>
              </div>
            </div>

            {/* Right: Styled Interactive Map Canvas */}
            <div className="lg:col-span-6">
              <div className="bg-surface-panel border border-border-subtle rounded-2xl p-4 shadow-2xl relative overflow-hidden">
                {/* Simulated GPS Radar Map Visual */}
                <div className="relative h-96 w-full rounded-xl overflow-hidden bg-surface-base">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2543.9996874877015!2d30.71088247655339!3d50.38520437157981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTDCsDIzJzA2LjciTiAzMMKwNDInNDguNSJF!5e0!3m2!1suk!2sua!4v1699540795012!5m2!1suk!2sua"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(90%)' }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Локація KVADRO KYIV 1"
                  />
                  {/* Map Radar Grid Accent */}
                  <div className="absolute inset-0 bg-surface-base/30 technical-grid pointer-events-none" />

                  {/* Pin Marker Card */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-xl bg-surface-base/95 backdrop-blur-md border border-border-active shadow-2xl flex items-center gap-3 pointer-events-none">
                    <div className="w-10 h-10 rounded-lg bg-border-active flex items-center justify-center text-white shrink-0">
                      <MaterialIcon className="">sports_motorsports</MaterialIcon>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-headline-sm text-sm font-bold text-text-primary">KVADRO KYIV 1</span>
                        <span className="w-2 h-2 rounded-full bg-success-emerald animate-ping" />
                      </div>
                      <span className="font-body-sm text-xs text-text-muted block">{currentSettings.addressShort}</span>
                    </div>
                  </div>

                  {/* Map Bottom Bar */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-surface-panel-elevated/90 backdrop-blur-md border border-border-subtle flex justify-between items-center text-xs pointer-events-none">
                    <span className="text-text-muted">
                      Координати: <strong className="text-text-primary font-mono">50°23&apos;06.7&quot;N 30°42&apos;48.5&quot;E</strong>
                    </span>
                    <span className="text-brand-amber font-bold uppercase">15 хв від м. Бориспільська</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
