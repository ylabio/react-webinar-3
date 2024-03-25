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
        tokenHeader: 'X-Token'
      }
    }
  },
  api: {
    baseUrl: '',
    tokenHeader: 'X-Token',
    langHeader: 'Accept-Language',
  },
  i18n: {
    lang: window.localStorage.getItem('lang') || 'ru',
  },
}

export default config;
