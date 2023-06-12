// ru-RU -> ru
export function formatLocale(locale) {
  if (locale.indexOf('-')) {
    return locale.split('-')[0];
  }

  return locale;
}