'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { defaultRoutes, RouteItem, defaultSettings } from '@/lib/defaultData'

interface RoutesGalleryProps {
  routes?: RouteItem[]
  settings?: typeof defaultSettings
}

export function RoutesGallery({ routes, settings }: RoutesGalleryProps) {
  const currentRoutes = routes && routes.length > 0 ? routes : defaultRoutes
  const currentSettings = settings || defaultSettings
  const [activeModalImage, setActiveModalImage] = useState<RouteItem | null>(null)

  const groupRoute = currentRoutes.find((r) => r.category === 'group' && !r.title.toLowerCase().includes('баггі')) || currentRoutes[0]
  const enduroRoute = currentRoutes.find((r) => r.category === 'enduro' || r.title.toLowerCase().includes('ендуро')) || currentRoutes[1] || currentRoutes[0]
  const buggyRoute = currentRoutes.find((r) => r.category === 'buggy' || r.title.toLowerCase().includes('баггі') || r.categoryLabel?.toLowerCase().includes('баггі')) || currentRoutes[4] || currentRoutes[0]
  const photoRoute = currentRoutes.find((r) => r.category === 'photo_zone' && !r.title.toLowerCase().includes('сонця')) || currentRoutes[3] || currentRoutes[0]
  const corporateRoute = currentRoutes.find((r) => r.category === 'corporate' || r.title.toLowerCase().includes('тімбілдінг')) || currentRoutes[2] || currentRoutes[0]
  const sunsetRoute = currentRoutes.find((r) => r.title.toLowerCase().includes('сонця')) || currentRoutes[5] || currentRoutes[0]

  const mobileBentoItems = [
    { item: groupRoute, tag: '#груповийзаїзд' },
    { item: buggyRoute, tag: '#баггікиїв' },
    { item: enduroRoute, tag: '#ендуро250' },
    { item: photoRoute, tag: '#фотозона' },
  ]

  return (
    <section id="routes" className="scroll-mt-20 lg:scroll-mt-24 bg-[#0B0E14] relative border-b border-border-subtle">
      {/* ===================== MOBILE GALLERY (< md) ===================== */}
      <div className="md:hidden py-10 px-4">
        <div className="max-w-md mx-auto space-y-5">
          <div className="flex justify-between items-end">
            <div>
              <span className="font-label-caps text-xs text-border-active uppercase font-bold tracking-wider">
                Живі емоції
              </span>
              <h2 className="font-headline-xl-mobile text-2xl font-black text-text-primary uppercase mt-1 leading-tight">
                Галерея райдерів
              </h2>
            </div>
            <a
              className="text-border-active text-xs font-bold hover:underline flex items-center gap-0.5"
              href={currentSettings.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>@{currentSettings.instagramUsername}</span>
              <span className="material-symbols-outlined text-sm">arrow_outward</span>
            </a>
          </div>

          {/* 2x2 Bento Mobile Image Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {mobileBentoItems.map((bento, i) => (
              <div
                key={i}
                onClick={() => setActiveModalImage(bento.item)}
                className="relative rounded-lg overflow-hidden border border-border-subtle aspect-square group cursor-pointer"
              >
                <Image
                  src={bento.item.image}
                  alt={bento.item.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 bg-surface-base/80 px-2 py-0.5 rounded text-[10px] font-mono text-text-primary border border-white/10 font-bold">
                  {bento.tag}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-text-dim text-center">
            Під час кожного заїзду інструктор робить безкоштовні яскраві фото та відео на пам&apos;ять!
          </p>
        </div>
      </div>

      {/* ===================== DESKTOP GALLERY (>= md) ===================== */}
      <div className="hidden md:block py-20 bg-surface-panel/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="font-label-caps text-label-caps text-border-active uppercase tracking-widest font-extrabold flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">photo_library</span>
                Живі емоції та драйв
              </span>
              <h2 className="font-headline-xl text-3xl md:text-headline-xl text-text-primary font-black uppercase mt-2">
                Галерея наших райдерів
              </h2>
            </div>
            <a
              className="inline-flex items-center gap-2 text-border-active hover:text-brand-amber font-headline-sm text-sm uppercase font-bold"
              href={currentSettings.instagram}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>Більше фото в Instagram @{currentSettings.instagramUsername}</span>
              <span className="material-symbols-outlined text-base">open_in_new</span>
            </a>
          </div>

          {/* Asymmetric Bento Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Photo 1: Big Landscape Banner - Group Ride */}
            <div
              onClick={() => setActiveModalImage(groupRoute)}
              className="lg:col-span-2 relative h-72 rounded-xl overflow-hidden border border-border-subtle group cursor-pointer"
            >
              <Image
                src={groupRoute?.image || '/assets/gallery/16j.webp'}
                alt={groupRoute?.title || 'Групові заїзди'}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-base/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4">
                <span className="font-label-caps text-xs text-border-active uppercase font-bold">
                  {groupRoute?.categoryLabel || 'ГРУПОВІ ЗАЇЗДИ'}
                </span>
                <p className="font-headline-sm text-base text-text-primary font-bold">
                  {groupRoute?.title || 'Лісовий масив Дарницького лісництва'}
                </p>
              </div>
            </div>

            {/* Photo 2: Enduro Moto Tracks */}
            <div
              onClick={() => setActiveModalImage(enduroRoute)}
              className="relative h-72 rounded-xl overflow-hidden border border-border-subtle group cursor-pointer"
            >
              <Image
                src={enduroRoute?.image || '/assets/gallery/6j.webp'}
                alt={enduroRoute?.title || 'Ендуро мото треки'}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-base/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4">
                <span className="font-label-caps text-xs text-[#FF5722] uppercase font-bold">
                  {enduroRoute?.categoryLabel || 'ЕНДУРО МОТО ТРЕКИ'}
                </span>
                <p className="font-headline-sm text-sm text-text-primary font-bold">
                  {enduroRoute?.title || 'Ендуро мото треки та піщані кар\'єри'}
                </p>
              </div>
            </div>

            {/* Photo 3: Buggy Expeditions */}
            <div
              onClick={() => setActiveModalImage(buggyRoute)}
              className="relative h-72 rounded-xl overflow-hidden border border-border-subtle group cursor-pointer"
            >
              <Image
                src={buggyRoute?.image || '/assets/gallery/1p.webp'}
                alt={buggyRoute?.title || 'Потужні заїзди на баггі'}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-base/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4">
                <span className="font-label-caps text-xs text-[#FF5722] uppercase font-bold">
                  {buggyRoute?.categoryLabel || 'БАГГІ ЕКСПЕДИЦІЇ'}
                </span>
                <p className="font-headline-sm text-sm text-text-primary font-bold">
                  {buggyRoute?.title || 'Потужні заїзди на баггі по бездоріжжю'}
                </p>
              </div>
            </div>

            {/* Photo 4: Photo Zones */}
            <div
              onClick={() => setActiveModalImage(photoRoute)}
              className="relative h-72 rounded-xl overflow-hidden border border-border-subtle group cursor-pointer"
            >
              <Image
                src={photoRoute?.image || '/assets/gallery/5j.webp'}
                alt={photoRoute?.title || 'Фотозони на схилах'}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-base/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4">
                <span className="font-label-caps text-xs text-[#FF5722] uppercase font-bold">
                  {photoRoute?.categoryLabel || 'ФОТОЗОНИ НА СХИЛАХ'}
                </span>
                <p className="font-headline-sm text-sm text-text-primary font-bold">
                  {photoRoute?.title || 'Яскраві фотозони на схилах Бортничів'}
                </p>
              </div>
            </div>

            {/* Photo 5: Big Feature - Corporate Events */}
            <div
              onClick={() => setActiveModalImage(corporateRoute)}
              className="lg:col-span-2 relative h-72 rounded-xl overflow-hidden border border-border-subtle group cursor-pointer"
            >
              <Image
                src={corporateRoute?.image || '/assets/gallery/img2.webp'}
                alt={corporateRoute?.title || 'Корпоративи та дні народження'}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-base/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4">
                <span className="font-label-caps text-xs text-brand-amber uppercase font-bold">
                  {corporateRoute?.categoryLabel || 'КОРПОРАТИВИ ТА ДНІ НАРОДЖЕННЯ'}
                </span>
                <p className="font-headline-sm text-base text-text-primary font-bold">
                  {corporateRoute?.title || 'Незабутні свята та драйвовий тімбілдінг'}
                </p>
              </div>
            </div>

            {/* Photo 6: Sunset / Evening Rides */}
            <div
              onClick={() => setActiveModalImage(sunsetRoute)}
              className="relative h-72 rounded-xl overflow-hidden border border-border-subtle group cursor-pointer"
            >
              <Image
                src={sunsetRoute?.image || '/assets/gallery/13j.webp'}
                alt={sunsetRoute?.title || 'Вечірні прогулянки'}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-base/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4">
                <span className="font-label-caps text-xs text-[#FF5722] uppercase font-bold">
                  {sunsetRoute?.categoryLabel || 'ВЕЧІРНІ ПРОГУЛЯНКИ'}
                </span>
                <p className="font-headline-sm text-sm text-text-primary font-bold">
                  {sunsetRoute?.title || 'Заходи сонця над сосновим бором'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeModalImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveModalImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#161D2B] rounded-3xl overflow-hidden border border-[#252F45] p-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalImage(null)}
              className="absolute top-5 right-5 z-10 p-2 rounded-full bg-black/70 text-white hover:bg-black transition-all"
              aria-label="Закрити"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative w-full h-[50vh] sm:h-[65vh] rounded-2xl overflow-hidden">
              <Image
                src={activeModalImage.image}
                alt={activeModalImage.title}
                fill
                sizes="(max-width: 1024px) 95vw, 1200px"
                className="object-contain"
              />
            </div>

            <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF5722]">
                  {activeModalImage.categoryLabel}
                </span>
                <h4 className="font-display font-bold text-lg sm:text-xl text-white mt-0.5">
                  {activeModalImage.title}
                </h4>
                <p className="text-sm text-slate-300 mt-1">
                  {activeModalImage.description}
                </p>
              </div>

              <a
                href="#booking"
                onClick={() => setActiveModalImage(null)}
                className="px-6 py-3 rounded-xl bg-[#FF5722] hover:bg-[#FF6B00] text-white text-xs font-bold uppercase tracking-wider shrink-0 transition-all shadow-lg"
              >
                Забронювати заїзд сюди
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

