import { isValidCep } from './validators'

/** Pedidos com subtotal a partir de R$ 200,00 têm frete grátis. */
export const FREE_SHIPPING_THRESHOLD = 20000

export type Region = 'Sudeste' | 'Sul' | 'Centro-Oeste' | 'Norte/Nordeste'

const PRICE_BY_REGION: Record<Region, number> = {
  Sudeste: 1500,
  Sul: 2000,
  'Centro-Oeste': 2500,
  'Norte/Nordeste': 3000,
}

/**
 * Descobre a região pelo primeiro dígito do CEP.
 * 0 a 3 -> Sudeste | 4 a 6 -> Norte/Nordeste | 7 -> Centro-Oeste | 8 e 9 -> Sul
 */
export function getRegion(cep: string): Region {
  if (!isValidCep(cep)) {
    throw new Error('CEP inválido')
  }

  const firstDigit = Number(cep[0])

  if (firstDigit <= 3) return 'Sudeste'
  if (firstDigit <= 6) return 'Norte/Nordeste'
  if (firstDigit === 7) return 'Centro-Oeste'
  return 'Sul'
}

/** Valor do frete em centavos. Lança erro se o CEP for inválido. */
export function calculateShipping(cep: string, subtotal: number): number {
  const region = getRegion(cep)

  if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    return 0
  }

  return PRICE_BY_REGION[region]
}
