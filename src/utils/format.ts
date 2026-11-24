export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function generateOrderCode(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `UA-${num}`;
}
