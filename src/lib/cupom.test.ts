import { describe, expect, it } from 'vitest';
import { validateCoupon, calculateDiscount, COUPONS } from './coupon';

describe('cupom', () => {
  describe('validateCoupon', () => {
    it('valida cupom de porcentagem (PROMO10)', () => {
      const result = validateCoupon('PROMO10');
      expect(result.valid).toBe(true);
      if (result.valid) {
        expect(result.coupon.code).toBe('PROMO10');
        expect(result.coupon.type).toBe('percent');
        expect(result.coupon.value).toBe(10);
      }
    });

    it('valida cupom de valor fixo (DESCONTO50)', () => {
      const result = validateCoupon('DESCONTO50');
      expect(result.valid).toBe(true);
      if (result.valid) {
        expect(result.coupon.type).toBe('fixed');
        expect(result.coupon.value).toBe(5000); // R$ 50,00
      }
    });

    it('valida cupom de frete grátis (FRETEGRATIS)', () => {
      const result = validateCoupon('FRETEGRATIS');
      expect(result.valid).toBe(true);
      if (result.valid) {
        expect(result.coupon.type).toBe('free-shipping');
        expect(result.coupon.value).toBe(0);
      }
    });

    it('rejeita cupom expirado (NATAL2025) em 2026', () => {
      const result = validateCoupon('NATAL2025', new Date('2026-01-01'));
      expect(result.valid).toBe(false);
      if (!result.valid) {
        expect(result.error).toBe('Cupom expirado');
      }
    });

    it('aceita cupom NATAL2025 na data de expiração (31/12/2025)', () => {
      const result = validateCoupon('NATAL2025', new Date('2025-12-31'));
      expect(result.valid).toBe(true);
    });
  });

  describe('calculateDiscount', () => {
    it('calcula desconto porcentual de 10% sobre R$ 200,00', () => {
      const coupon = COUPONS.find((c) => c.code === 'PROMO10')!;
      const discount = calculateDiscount(20000, coupon);
      expect(discount).toBe(2000); // 10% de 20000 = 2000 centavos
    });

    it('calcula desconto fixo de R$ 50,00', () => {
      const coupon = COUPONS.find((c) => c.code === 'DESCONTO50')!;
      const discount = calculateDiscount(10000, coupon);
      expect(discount).toBe(5000);
    });

    it('retorna 0 para cupom de frete grátis (desconto aplicado no frete, não no subtotal)', () => {
      const coupon = COUPONS.find((c) => c.code === 'FRETEGRATIS')!;
      const discount = calculateDiscount(20000, coupon);
      expect(discount).toBe(0);
    });

    it('não permite desconto maior que o subtotal', () => {
      const coupon = COUPONS.find((c) => c.code === 'DESCONTO50')!; // R$ 50,00 fixo
      const discount = calculateDiscount(3000, coupon); // subtotal R$ 30,00
      expect(discount).toBe(3000); // limitado ao subtotal
    });

    it('ignora maiúsculas/minúsculas e espaços no código', () => {
      const result1 = validateCoupon('  promo10  ');
      const result2 = validateCoupon('Promo10');
      const result3 = validateCoupon('PROMO10');
      expect(result1.valid).toBe(true);
      expect(result2.valid).toBe(true);
      expect(result3.valid).toBe(true);
    });
  });
});