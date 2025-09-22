const SUPPORTED_CURRENCIES = {
  GTQ: 'GTQ',
  // USD: 'USD',
} as const;

type SupportedCurrency = typeof SUPPORTED_CURRENCIES[keyof typeof SUPPORTED_CURRENCIES];


function formatCurrency(amount: number, currency: SupportedCurrency = SUPPORTED_CURRENCIES.GTQ): string {
  return new Intl.NumberFormat('es-GT', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export {
  formatCurrency,
  SUPPORTED_CURRENCIES,
}