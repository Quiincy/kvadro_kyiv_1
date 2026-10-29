/**
 * Ukrainian phone number utilities with fixed permanent '+380 (' prefix
 */

export const UKRAINE_PHONE_PREFIX = '+380 ('

/**
 * Formats any input string into the Ukrainian format: +380 (XX) XXX-XX-XX
 * Keeps the '+380 (' prefix permanent.
 */
export function formatUkrainianPhone(val: string): string {
  if (!val) return UKRAINE_PHONE_PREFIX

  // Extract all digits
  const raw = val.replace(/\D/g, '')

  // Extract subscriber digits (up to 9 digits)
  let sub = ''
  if (raw.startsWith('380')) {
    sub = raw.slice(3, 12)
  } else if (raw.startsWith('38')) {
    sub = raw.slice(2, 11)
  } else if (raw.startsWith('0')) {
    sub = raw.slice(1, 10)
  } else {
    sub = raw.slice(0, 9)
  }

  // If user entered a leading 0 into the subscriber part (e.g. 098 instead of 98), strip it
  if (sub.startsWith('0')) {
    sub = sub.slice(1)
  }

  let res = UKRAINE_PHONE_PREFIX + sub.slice(0, 2)
  if (sub.length > 2) {
    res += ') ' + sub.slice(2, 5)
  } else if (sub.length === 2) {
    res += ') '
  }
  if (sub.length > 5) {
    res += '-' + sub.slice(5, 7)
  }
  if (sub.length > 7) {
    res += '-' + sub.slice(7, 9)
  }
  return res
}

/**
 * Handles Backspace, Delete, and cursor constraints so '+380 (' cannot be erased
 */
export function handlePhoneKeyDown(
  e: React.KeyboardEvent<HTMLInputElement>,
  setValue: (val: string) => void
) {
  const input = e.currentTarget
  const { selectionStart, selectionEnd, value } = input
  const prefixLen = UKRAINE_PHONE_PREFIX.length // 6 characters: '+380 ('

  if (e.key === 'Backspace') {
    // If range selection overlaps the prefix
    if (selectionStart !== null && selectionEnd !== null && selectionStart !== selectionEnd) {
      if (selectionStart < prefixLen) {
        e.preventDefault()
        // If selection reaches the end or covers all digits, reset to prefix
        if (selectionEnd >= value.length) {
          setValue(UKRAINE_PHONE_PREFIX)
        } else {
          const next = UKRAINE_PHONE_PREFIX + value.slice(selectionEnd)
          setValue(formatUkrainianPhone(next))
        }
        return
      }
    }

    // Normal single-point cursor
    if (selectionStart !== null && selectionStart === selectionEnd) {
      // Cannot delete into the prefix '+380 ('
      if (selectionStart <= prefixLen) {
        e.preventDefault()
        return
      }

      const charBefore = value[selectionStart - 1]
      // If deleting a separator, jump back and delete the preceding digit as well
      if (/\D/.test(charBefore)) {
        e.preventDefault()
        let targetDigitIdx = selectionStart - 1
        while (targetDigitIdx >= prefixLen && /\D/.test(value[targetDigitIdx])) {
          targetDigitIdx--
        }

        if (targetDigitIdx >= prefixLen) {
          const nextVal = value.slice(0, targetDigitIdx) + value.slice(selectionStart)
          setValue(formatUkrainianPhone(nextVal))
        } else {
          setValue(UKRAINE_PHONE_PREFIX)
        }
      }
    }
  } else if (e.key === 'Delete') {
    // Prevent forward delete inside prefix
    if (selectionStart !== null && selectionStart < prefixLen) {
      e.preventDefault()
    }
  }
}

/**
 * Prevents placing cursor before prefix on click/focus
 */
export function handlePhoneFocusOrClick(e: React.SyntheticEvent<HTMLInputElement>) {
  const input = e.currentTarget
  const prefixLen = UKRAINE_PHONE_PREFIX.length
  if (input.selectionStart !== null && input.selectionStart < prefixLen) {
    const targetPos = Math.max(prefixLen, input.value.length)
    input.setSelectionRange(targetPos, targetPos)
  }
}

/**
 * Checks if the phone number has all required 12 digits (+380 + 9 subscriber digits)
 */
export function isCompleteUkrainianPhone(val: string): boolean {
  const cleanDigits = val.replace(/\D/g, '')
  return cleanDigits.length >= 12
}
