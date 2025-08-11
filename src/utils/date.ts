

function formatDate({ dateString, withTime = false }: { dateString: string | null, withTime?: boolean }): string {
  if (!dateString) return 'No disponible';

  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-GT', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...(withTime && { hour: '2-digit', minute: '2-digit' }),
  }).format(date);
}

export {
  formatDate,
}