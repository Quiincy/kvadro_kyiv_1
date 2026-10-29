'use client'

import React from 'react'
import { AlertTriangle, X } from 'lucide-react'

interface FormFieldTooltipProps {
  message?: string
  subtext?: string
  id?: string
}

/**
 * Branded KVADRO KYIV 1 validation tooltip that replaces native browser HTML5 popups.
 * Renders with an upward pointer arrow, glowing orange-amber icon badge, and dark glass surface.
 */
export function FormFieldTooltip({ message, subtext, id }: FormFieldTooltipProps) {
  if (!message) return null

  return (
    <div
      id={id}
      role="alert"
      aria-live="polite"
      className="relative mt-2 animate-scaleUp select-none"
    >
      {/* Upward Pointer Arrow */}
      <div
        aria-hidden="true"
        className="absolute -top-1.5 left-5 w-3 h-3 rotate-45 bg-[#161D2B] border-l border-t border-border-active/80 z-10"
      />

      {/* Tooltip Card Body */}
      <div className="relative z-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#161D2B] via-[#1C2333] to-[#161D2B] border border-border-active/80 shadow-[0_8px_24px_-4px_rgba(214,52,0,0.35)]">
        {/* Glowing Brand Exclamation Badge */}
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-border-active to-brand-amber text-white flex items-center justify-center shrink-0 shadow-sm shadow-border-active/50">
          <span className="font-headline-sm text-xs font-black leading-none">!</span>
        </div>

        {/* Message Text */}
        <div className="flex flex-col min-w-0">
          <span className="font-headline-sm text-xs font-bold text-text-primary leading-snug">
            {message}
          </span>
          {subtext && (
            <span className="font-body-sm text-[11px] text-text-muted leading-tight mt-0.5">
              {subtext}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

interface FormAlertBannerProps {
  message?: string
  onDismiss?: () => void
}

/**
 * Branded form-level alert banner for server/network errors
 */
export function FormAlertBanner({ message, onDismiss }: FormAlertBannerProps) {
  if (!message) return null

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="relative flex items-start gap-3 p-3.5 rounded-xl bg-gradient-to-r from-[#1A141B] via-[#221720] to-[#1A141B] border border-border-active/80 shadow-[0_10px_28px_-6px_rgba(214,52,0,0.3)] animate-scaleUp"
    >
      <div className="w-7 h-7 rounded-lg bg-border-active/20 border border-border-active/50 text-brand-amber flex items-center justify-center shrink-0 mt-0.5">
        <AlertTriangle className="w-4 h-4 text-border-active" />
      </div>
      <div className="flex-1 min-w-0">
        <span className="font-label-caps text-[10px] uppercase tracking-wider text-brand-amber font-extrabold block">
          Зверніть увагу
        </span>
        <p className="font-body-sm text-xs text-text-primary font-medium leading-relaxed mt-0.5">
          {message}
        </p>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Закрити повідомлення"
          className="text-text-dim hover:text-text-primary p-1 rounded-lg hover:bg-white/5 transition-colors shrink-0 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
