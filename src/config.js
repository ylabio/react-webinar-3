import ru from '../src/i18n/translations/ru.json';
import en from '../src/i18n/translations/en.json';

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Настройки сервисов
 */
export default {
  store: {
    log: !isProduction,
    modules: {
      session: {
        tokenHeader: 'X-Token',
      },
    },
  },
  api: {
    baseUrl: process.env.REACT_APP_API_BASE || '',
  },
  i18n: {
    defaultLang: 'ru',
    translations: { ru, en },
    apiLanguageMap: {
      ru: 'ru-RU',
      en: 'en-US'
    }
  },
};
