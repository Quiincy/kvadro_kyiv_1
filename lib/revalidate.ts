import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

export const revalidateHomepage = () => {
  try {
    revalidatePath('/')
    revalidatePath('/', 'layout')
    console.log('[Revalidate] Purged Next.js cache for /')
  } catch (err) {
    console.warn('[Revalidate] Error purging cache:', err)
  }
}

export const revalidateCollectionAfterChange: CollectionAfterChangeHook = ({ doc }) => {
  revalidateHomepage()
  return doc
}

export const revalidateCollectionAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidateHomepage()
  return doc
}

export const revalidateGlobalAfterChange: GlobalAfterChangeHook = ({ doc }) => {
  revalidateHomepage()
  return doc
}
