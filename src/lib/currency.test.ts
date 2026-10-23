// EXEMPLO DE TESTE UNITÁRIO (Vitest)
// Rode com: npm test
import { describe, expect, it } from 'vitest'
import { formatCurrency } from './currency'

// `describe` agrupa testes relacionados.
describe('formatCurrency', () => {
  // `it` é um caso de teste. O texto explica o comportamento esperado.
  it('formata centavos como reais', () => {
    // Arrange (preparar)
    const valorEmCentavos = 1990

    // Act (executar)
    const resultado = formatCurrency(valorEmCentavos)

    // Assert (verificar)
    expect(resultado).toBe('R$ 19,90')
  });

it('valor negativo', () => {
  const valorNegativo = -100000000;
  const resultado = formatCurrency(valorNegativo);
  expect(resultado).toBe('-R$ 1.000.000,00');
});

it('valorComCentavos', () => {
  const valorComCentavos = 003;
  const resultado = formatCurrency(valorComCentavos);
  expect(resultado).toBe('R$ 0,03');
});

it('valorZero', () => {
  const valorZero = 000;
  const resultado = formatCurrency(valorZero);
  expect(resultado).toBe('R$ 0,00');
});

it('valorExpecifico', () => {
  const valorExpecifico = 123456;
  const resultado = formatCurrency(valorExpecifico);
  expect(resultado).toBe('R$ 1.234,56');
});


  // TODO: escreva mais casos. Ideias: zero, 5 centavos, R$ 1.234,56, valores negativos...
})
