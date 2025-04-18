import ru from './i18n/translations/ru.json';
import en from './i18n/translations/en.json';

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Настройки сервисов
 */
const config = {
  store: {
    // Логировать установку состояния?
    log: !isProduction,
    // Настройки модулей состояния
    modules: {
      session: {
        // Названия токена в АПИ
        tokenHeader: 'X-Token',
      },
    },
  },
  api: {
    baseUrl: '',
  },
  i18n: {
    locale: 'ru',
    dictionary: {
      ru,
      en,
    },
  },
};

export default config;
