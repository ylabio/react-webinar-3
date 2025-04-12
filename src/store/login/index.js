import StoreModule from '../module';

class LoginState extends StoreModule {
  initState() {
    return {
      token: localStorage.getItem('authToken') || null,
      user: null,
      waiting: false,
      error: null,
      profileWaiting: false,
      profileLoaded: false,
    };
  }

  /**
   * Инициализация сессии: проверка токена и загрузка профиля, если токен есть
   */
  async init() {
    const token = this.getState().token;
    if (token && !this.getState().profileLoaded) {
      await this.loadProfile();
    } else if (!token) {
      this.setState({ ...this.initState(), token: null }, 'Сессия инициализирована (нет токена)');
    }
  }

  /**
   * Авторизация (логин)
   * @param {string} login
   * @param {string} password
   */
  async login({ login, password }) {
    this.setState({ ...this.getState(), waiting: true, error: null }, 'Авторизация...');

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });

      const json = await response.json();

      if (json.error) {
        const errorMessage = json.error.title || 'Ошибка авторизации';
        const issuesMessage = json.error.issues
          ? Object.entries(json.error.issues)
              .map(([key, value]) => `${key}: ${value}`)
              .join(', ')
          : null;
        throw new Error(issuesMessage ? `${errorMessage}. ${issuesMessage}` : errorMessage);
      }

      // Успешно
      const token = json.result.token;
      localStorage.setItem('authToken', token);

      this.setState(
        {
          ...this.getState(),
          token: token,
          user: json.result.user,
          waiting: false,
          error: null,
          profileLoaded: true,
        },
        'Авторизация успешна',
      );

      return true;
    } catch (e) {
      console.error('Ошибка авторизации:', e);
      localStorage.removeItem('authToken');
      this.setState(
        {
          ...this.getState(),
          token: null,
          user: null,
          waiting: false,
          error: e.message,
          profileLoaded: false,
        },
        'Ошибка авторизации',
      );
      return false;
    }
  }

  /**
   * Загрузка профиля пользователя
   */
  async loadProfile() {
    const token = this.getState().token;
    if (!token) {
      this.setState({ ...this.initState(), token: null }, 'Профиль не загружен (нет токена)');
      return;
    }

    this.setState(
      {
        ...this.getState(),
        profileWaiting: true,
        error: null,
      },
      'Загрузка профиля...',
    );

    try {
      const response = await fetch('/api/v1/users/self', {
        method: 'GET',
        headers: {
          'X-Token': token,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Неверный токен');
        }
        throw new Error(`Ошибка ${response.status}`);
      }

      const json = await response.json();

      if (json.error) {
        throw new Error(json.error.title || 'Ошибка загрузки профиля');
      }

      this.setState(
        {
          ...this.getState(),
          user: json.result,
          profileWaiting: false,
          profileLoaded: true,
        },
        'Профиль загружен',
      );
    } catch (e) {
      console.error('Ошибка загрузки профиля:', e);
      this.logout();
      this.setState(
        {
          ...this.getState(),
          profileWaiting: false,
          error: e.message,
        },
        'Ошибка загрузки профиля',
      );
    }
  }

  /**
   * Выход из системы
   */
  logout() {
    localStorage.removeItem('authToken');
    this.setState(
      {
        ...this.initState(),
        token: null,
      },
      'Выход из системы',
    );
  }
}

export default LoginState;
