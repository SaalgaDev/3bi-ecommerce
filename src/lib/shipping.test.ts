import { describe, expect, it } from 'vitest';
import { calculateShipping } from './shipping';

describe('shipping', () => {
  it('dá frete grátis para R$200,00 exatos', () => {
    const cep = '01234-567';
    const valor = 20000;
    const resultado = calculateShipping(cep, valor);
    expect(resultado).toBe(0);
  });

  it.each([
    ['01234-567', 1500],
    ['81234-567', 2000],
    ['71234-567', 2500],
    ['41234-567', 3000],
  ])('CEP %s paga frete de %d', (cep, valor) => {
    const valorPedido = 5000;
    const resultado = calculateShipping(cep, valorPedido);
    expect(resultado).toBe(valor);
  });
});
