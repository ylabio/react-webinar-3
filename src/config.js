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
        localeHeader: 'Accept-Language'
      }
    }
  },
  api: {
    baseUrl: ''
  },
  i18n: {
    locale: 'ru'
  }
}

export default config;
