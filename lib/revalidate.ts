import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

/**
 * Safely revalidates the frontend landing page cache without throwing
 * if called outside an active Next.js action/route handler context.
 */
export function safeRevalidateSite(): void {
  try {
    revalidatePath('/')
    revalidatePath('/', 'layout')
  } catch {
    // Ignore when called during SSR render pass or standalone scripts
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc, req: { context } }) => {
  if (!context?.disableRevalidate) {
    safeRevalidateSite()
  }
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  if (!context?.disableRevalidate) {
    safeRevalidateSite()
  }
  return doc
}

export const revalidateGlobalAfterChange: GlobalAfterChangeHook = ({ doc, req: { context } }) => {
  if (!context?.disableRevalidate) {
    safeRevalidateSite()
  }
  return doc
}

