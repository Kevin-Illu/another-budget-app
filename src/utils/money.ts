function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('es-GT', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export {
  formatCurrency,
}