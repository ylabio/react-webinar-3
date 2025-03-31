export const formatPrice = price => {
  return (
    new Intl.NumberFormat('ru-RU', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price) + ' ₽'
  );
};

// Форматирование  (1000.50 → "1 000 ₽")
export const formatPriceWithoutCents = price => {
  return (
    new Intl.NumberFormat('ru-RU', {
      style: 'decimal',
      maximumFractionDigits: 0,
    }).format(price) + ' ₽'
  );
};
