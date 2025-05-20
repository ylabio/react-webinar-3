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
    baseUrl: isProduction ? 'https://nimble-sunflower-ebf1d2.netlify.app' : '',
  },
  i18n: {
    defaultLang: 'ru',
    supportedLangs: ['ru', 'en'],
  },
};

export default config;
