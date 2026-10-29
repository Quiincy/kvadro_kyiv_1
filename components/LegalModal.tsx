'use client'

import React, { useEffect, useState } from 'react'
import { X, ShieldAlert, FileText, CheckCircle2, AlertTriangle, Sparkles, Scale, Info, Check, Phone } from 'lucide-react'
import { defaultSettings } from '@/lib/defaultData'

export type LegalModalType = 'safety' | 'offer'

interface LegalModalProps {
  isOpen: boolean
  onClose: () => void
  initialType?: LegalModalType
  onOpenBooking?: () => void
  settings?: typeof defaultSettings
}

export function LegalModal({
  isOpen,
  onClose,
  initialType = 'safety',
  onOpenBooking,
  settings,
}: LegalModalProps) {
  const currentSettings = settings || defaultSettings
  const [activeTab, setActiveTab] = useState<LegalModalType>(initialType)

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialType)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen, initialType])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Shell */}
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-surface-elevated/95 border border-border-subtle rounded-2xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-border-subtle bg-surface-card/60 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              activeTab === 'safety' 
                ? 'bg-brand-amber/15 text-brand-amber border border-brand-amber/30' 
                : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
            }`}>
              {activeTab === 'safety' ? (
                <ShieldAlert className="w-5 h-5" />
              ) : (
                <Scale className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-text-dim">
                  KVADRO KYIV 1 • ОФІЦІЙНІ ПРАВИЛА
                </span>
              </div>
              <h2 className="text-base sm:text-lg md:text-xl font-bold font-headline-sm text-text-primary">
                {activeTab === 'safety' ? 'Правила безпеки та інструктаж' : 'Публічна оферта (Договір прокату)'}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Закрити"
            className="w-9 h-9 rounded-xl bg-surface-panel hover:bg-surface-subtle text-text-muted hover:text-text-primary flex items-center justify-center transition-colors border border-border-subtle shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-4 sm:px-6 pt-3 pb-2 bg-surface-base/80 border-b border-border-subtle flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('safety')}
            className={`flex-1 py-2.5 px-3 rounded-xl font-headline-sm text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'safety'
                ? 'bg-brand-amber text-white shadow-lg shadow-brand-amber/20'
                : 'bg-surface-panel hover:bg-surface-subtle text-text-muted hover:text-text-primary border border-border-subtle'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Правила безпеки</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('offer')}
            className={`flex-1 py-2.5 px-3 rounded-xl font-headline-sm text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'offer'
                ? 'bg-brand-amber text-white shadow-lg shadow-brand-amber/20'
                : 'bg-surface-panel hover:bg-surface-subtle text-text-muted hover:text-text-primary border border-border-subtle'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Публічна оферта</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-sm text-text-muted leading-relaxed font-body-sm scrollbar-thin scrollbar-thumb-border-active/40">
          
          {/* ===================== TAB 1: SAFETY RULES ===================== */}
          {activeTab === 'safety' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Important banner */}
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-200">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <span className="font-bold text-red-300 block mb-0.5">КАТЕГОРИЧНО ЗАБОРОНЕНО:</span>
                  Керування будь-якою технікою у стані алкогольного, наркотичного або токсичного сп&apos;яніння. При виявленні ознак сп&apos;яніння клієнт відсторонюється від заїзду без повернення коштів.
                </div>
              </div>

              {/* Section 1 */}
              <div className="bg-surface-card/50 border border-border-subtle rounded-xl p-4 sm:p-5 space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-text-primary flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-brand-amber/20 text-brand-amber flex items-center justify-center text-xs font-mono">1</span>
                  Вимоги до водіїв та пасажирів
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm pl-8 list-disc list-outside text-text-dim">
                  <li><strong className="text-text-primary">Вік за кермом:</strong> самостійне керування квадроциклом та ендуро дозволяється особам від 16–18 років (або від 14 років під наглядом батьків на навчальній трасі).</li>
                  <li><strong className="text-text-primary">Пасажири:</strong> допускаються діти від 6 років у супроводі дорослого або досвідченого інструктора.</li>
                  <li><strong className="text-text-primary">Посвідчення водія:</strong> для руху закритими лісовими трасами наявність водійських прав не є обов&apos;язковою, оскільки маршрути проходять поза дорогами загального користування.</li>
                  <li><strong className="text-text-primary">Вага:</strong> загальне навантаження на двомісний квадроцикл або баггі не має перевищувати 180 кг.</li>
                </ul>
              </div>

              {/* Section 2 */}
              <div className="bg-surface-card/50 border border-border-subtle rounded-xl p-4 sm:p-5 space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-text-primary flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-brand-amber/20 text-brand-amber flex items-center justify-center text-xs font-mono">2</span>
                  Обов&apos;язкова захисна екіпіровка (надається безкоштовно)
                </h3>
                <p className="text-xs sm:text-sm text-text-dim">
                  Перед кожним виїздом клуб надає повний комплект чистого сертифікованого захисту:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-panel border border-border-subtle">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Захисний мотокрос шолом (застібнутий весь заїзд)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-panel border border-border-subtle">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Індивідуальний чистий підшоломник (балаклава)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-panel border border-border-subtle">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Захисні мотоокуляри від піску, гілок та пилу</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-panel border border-border-subtle">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Фірмове захисне джерсі, рукавички, дощовики в негоду</span>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="bg-surface-card/50 border border-border-subtle rounded-xl p-4 sm:p-5 space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-text-primary flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-brand-amber/20 text-brand-amber flex items-center justify-center text-xs font-mono">3</span>
                  Рух у колоні та дистанція
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm pl-8 list-disc list-outside text-text-dim">
                  <li><strong className="text-text-primary">Дистанція безпеки:</strong> тримайте відстань не менше 10–15 метрів на прямих ділянках, та не менше 20 метрів на піщаних підйомах та крутих спусках.</li>
                  <li><strong className="text-text-primary">Заборона обгону:</strong> категорично заборонено самовільно обганяти інструктора або інших райдерів колони.</li>
                  <li><strong className="text-text-primary">Траєкторія:</strong> рухайтесь суворо за слідом провідного інструктора, який вибирає найбезпечніший шлях.</li>
                  <li><strong className="text-text-primary">Швидкість:</strong> обирається згідно з рівнем групи та вказівками провідника.</li>
                </ul>
              </div>

              {/* Section 4 */}
              <div className="bg-surface-card/50 border border-border-subtle rounded-xl p-4 sm:p-5 space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-text-primary flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-brand-amber/20 text-brand-amber flex items-center justify-center text-xs font-mono">4</span>
                  Заборонені маневри та безпека кінцівок
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm pl-8 list-disc list-outside text-text-dim">
                  <li><strong className="text-text-primary">Положення ніг:</strong> ноги ЗАВЖДИ повинні знаходитись на спеціальних підніжках. Зняття ніг під час руху чи спроба пригальмувати ногою може призвести до травмування заднім колесом.</li>
                  <li><strong className="text-text-primary">Агресивний дрифт:</strong> несанкціоновані різкі заноси на схилах можуть спричинити перекидання техніки.</li>
                  <li><strong className="text-text-primary">Зіткнення (бампінг):</strong> заборонено навмисно наближатися чи штовхати інші квадроцикли бампером.</li>
                </ul>
              </div>

              {/* Section 5 */}
              <div className="bg-surface-card/50 border border-border-subtle rounded-xl p-4 sm:p-5 space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-text-primary flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-brand-amber/20 text-brand-amber flex items-center justify-center text-xs font-mono">5</span>
                  Дії в разі зупинки або застрягання в піску
                </h3>
                <p className="text-xs sm:text-sm text-text-dim">
                  Якщо ваша техніка застрягла у глибокому піску або ви заглухли: НЕ газуйте безперервно (це закопує колеса) і НЕ намагайтеся самостійно штовхати заведений квадроцикл ззаду. Просто підніміть руку вгору — інструктор миттєво під&apos;їде і допоможе безпечно виїхати.
                </p>
              </div>
            </div>
          )}

          {/* ===================== TAB 2: PUBLIC OFFER ===================== */}
          {activeTab === 'offer' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Notice */}
              <div className="p-4 rounded-xl bg-surface-panel border border-border-subtle flex items-start gap-3 text-text-muted">
                <Info className="w-5 h-5 text-brand-amber shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  Цей документ є публічною офертою (договором) відповідно до ст. 633 та 641 Цивільного кодексу України. Подання заявки на сайті, оплата або початок користування послугами є повним і беззастережним акцептом цих умов.
                </div>
              </div>

              {/* 1. General */}
              <div className="space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-text-primary">1. Загальні положення</h3>
                <p className="text-xs sm:text-sm text-text-dim">
                  1.1. Фізична особа-підприємець / Сервіс прокату «KVADRO KYIV 1» (далі — «Орендодавець»), публікує цей Договір про надання послуг прокату самохідної мототехніки (квадроциклів, ендуро мотоциклів, баггі) та організацію супроводу на маршрутах.<br />
                  1.2. Будь-яка дієздатна фізична особа, яка прийняла умови цієї Оферти (далі — «Клієнт» або «Орендар»), набуває прав і обов&apos;язків, передбачених цим Договором.
                </p>
              </div>

              {/* 2. Subject */}
              <div className="space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-text-primary">2. Предмет договору</h3>
                <p className="text-xs sm:text-sm text-text-dim">
                  2.1. Орендодавець зобов&apos;язується надати Орендарю у тимчасове платне користування технічно справну мототехніку та необхідну захисну екіпіровку, а також провести навчальний інструктаж та забезпечити супровід інструктором на лісових маршрутах.<br />
                  2.2. Орендар зобов&apos;язується своєчасно оплатити послугу та дотримуватись Правил безпеки та умов цього Договору.
                </p>
              </div>

              {/* 3. Booking and Payment */}
              <div className="space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-text-primary">3. Бронювання, оплата та скасування</h3>
                <p className="text-xs sm:text-sm text-text-dim">
                  3.1. Бронювання часу та техніки здійснюється через сайт, за номером {currentSettings.phone} або через месенджери Telegram / Instagram.<br />
                  3.2. Для закріплення броні може бути встановлена передоплата (або повна оплата подарункового сертифіката).<br />
                  3.3. Перенесення заїзду на інший зручний час без втрати коштів можливе за умови попередження адміністратора не пізніше ніж за 24 години до початку заїзду.<br />
                  3.4. У разі несприятливих погодних умов (ураганний вітер, сильна злива) заїзд може бути перенесений за домовленістю сторін на будь-яку іншу зручну дату.
                </p>
              </div>

              {/* 4. Rights and Responsibilities */}
              <div className="space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-text-primary">4. Права та обов&apos;язки сторін</h3>
                <p className="text-xs sm:text-sm text-text-dim">
                  4.1. <strong className="text-text-primary">Орендодавець зобов&apos;язаний:</strong> надати техніку в технічно справному стані, забезпечити дезінфікованим шоломом і чистим екіпіруванням, провести інструктаж та надати супровід.<br />
                  4.2. <strong className="text-text-primary">Орендар зобов&apos;язаний:</strong> дбайливо ставитися до техніки, суворо виконувати команди інструктора на маршруті, дотримуватися дистанції та не передавати кермо третім особам без узгодження з інструктором.<br />
                  4.3. Орендодавець має право в односторонньому порядку відмовити у наданні послуг або зупинити заїзд у разі неадекватної поведінки клієнта, алкогольного сп&apos;яніння або злісного ігнорування інструкцій без компенсації вартості оренди.
                </p>
              </div>

              {/* 5. Liability */}
              <div className="space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-text-primary">5. Відповідальність та відшкодування збитків</h3>
                <p className="text-xs sm:text-sm text-text-dim">
                  5.1. Природне зношування техніки та можливі дрібні подряпини від гілок під час руху лісовою трасою входять у вартість оренди.<br />
                  5.2. У разі навмисного пошкодження техніки внаслідок грубого порушення правил безпеки (зіткнення з іншим транспортним засобом, перекидання через несанкціонований дрифт, наїзд на перешкоди через виїзд з маршруту), Орендар несе матеріальну відповідальність у розмірі вартості пошкоджених запчастин та відновлювальних робіт.<br />
                  5.3. Орендодавець не несе відповідальності за особисті речі (телефони, годинники, прикраси), залишені або втрачені на лісовому маршруті. Рекомендуємо залишати цінні речі у безкоштовних камерах схову на базі.
                </p>
              </div>

              {/* 6. Gift Certificates */}
              <div className="space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-text-primary">6. Подарункові сертифікати</h3>
                <p className="text-xs sm:text-sm text-text-dim">
                  6.1. Подарунковий сертифікат KVADRO KYIV 1 діє протягом 12 місяців з моменту придбання.<br />
                  6.2. Сертифікат може бути використаний на будь-яку техніку або маршрут у межах його номіналу. Якщо вартість обраного заїзду перевищує номінал, можлива доплата різниці.<br />
                  6.3. Сертифікат не підлягає грошовому поверненню, але може бути вільно переданий будь-якій іншій особі.
                </p>
              </div>

              {/* 7. Contacts & Requisites */}
              <div className="p-3.5 rounded-xl bg-surface-card border border-border-subtle text-xs space-y-1 font-mono text-text-dim">
                <div className="text-text-primary font-bold">KVADRO KYIV 1 — Прокат квадроциклів, ендуро та баггі</div>
                <div>Локація: {currentSettings.address}</div>
                <div>Телефон: {currentSettings.phone}</div>
                <div>Графік: {currentSettings.workingHours}</div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-border-subtle bg-surface-card/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-text-dim flex items-center gap-2 self-start sm:self-auto">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Безпека та якість сервісу на першому місці</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {onOpenBooking && (
              <button
                type="button"
                onClick={() => {
                  onClose()
                  onOpenBooking()
                }}
                className="flex-1 sm:flex-initial h-11 sm:h-10 px-3.5 sm:px-5 bg-brand-amber hover:bg-border-active text-white text-xs sm:text-sm font-headline-sm font-semibold rounded-xl transition-all shadow-md shadow-brand-amber/20 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-98"
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Забронювати заїзд</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial h-11 sm:h-10 px-3.5 sm:px-5 bg-surface-panel hover:bg-surface-subtle text-text-primary text-xs sm:text-sm font-headline-sm font-semibold rounded-xl border border-border-subtle transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-98"
            >
              <Check className="w-4 h-4 shrink-0 text-text-dim" />
              <span>Зрозуміло</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
