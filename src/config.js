const isProduction = process.env.NODE_ENV === 'production';

/**
 * Настройки сервисов
 */
const config = {
  isProduction,
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
    langHeader: 'Accept-Language',
  },
  i18n: {
    lang: 'ru',
  },
};

export default config;
