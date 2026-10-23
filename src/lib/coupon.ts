import type { Coupon } from '../types'

export const COUPONS: Coupon[] = [
  { code: 'PROMO10', type: 'percent', value: 10 },
  { code: 'DESCONTO50', type: 'fixed', value: 5000 },
  { code: 'FRETEGRATIS', type: 'free-shipping', value: 0 },
  { code: 'NATAL2025', type: 'percent', value: 20, expiresAt: '2025-12-31' },
]

export type CouponResult =
  | { valid: true; coupon: Coupon }
  | { valid: false; error: string }

export function validateCoupon(code: string, today: Date = new Date()): CouponResult {
  const normalized = code.trim().toUpperCase()

  if (normalized === '') {
    return { valid: false, error: 'Digite um cupom' }
  }

  const coupon = COUPONS.find((c) => c.code === normalized)

  if (!coupon) {
    return { valid: false, error: 'Cupom inválido' }
  }

  if (coupon.expiresAt && isAfterDay(today, coupon.expiresAt)) {
    return { valid: false, error: 'Cupom expirado' }
  }

  return { valid: true, coupon }
}

export function calculateDiscount(subtotal: number, coupon: Coupon | null): number {
  if (!coupon) {
    return 0
  }

  let discount: number
  switch (coupon.type) {
    case 'percent':
      discount = Math.round((subtotal * coupon.value) / 100)
      break
    case 'fixed':
      discount = coupon.value
      break
    case 'free-shipping':
      discount = 0
      break
  }

  return Math.min(discount, subtotal)
}

function isAfterDay(date: Date, isoDay: string): boolean {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${day}` > isoDay
}
