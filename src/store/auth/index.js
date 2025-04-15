export default class AuthState {
  constructor(store, name) {
    this.store = store;
    this.name = name;
    this.tokenKey = 'authToken';
  }

  /**
   * Преобразует ошибку API в стандартный формат
   */
  _normalizeError(error) {
    // Ошибка от API (свойство error в ответе)
    if (error?.error) {
      return {
        message: error.error.data?.issues?.[0]?.message || error.error.message || 'Ошибка API',
        issues: error.error.data?.issues || [],
      };
    }

    // Нативная ошибка
    if (error instanceof Error) {
      return {
        message: error.message || 'Системная ошибка',
        issues: [],
      };
    }

    // Прочие случаи
    return {
      message: 'Неизвестная ошибка',
      issues: [],
    };
  }

  initState() {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      this.checkTokenValidity(token); // Проверяем валидность токена
    }

    return {
      token,
      user: null,
      error: null,
      loading: false,
    };
  }

  async login(login, password) {
    const prevState = this.store.getState();

    this.store.setState({
      ...prevState,
      [this.name]: {
        ...prevState[this.name],
        loading: true,
        error: null,
      },
    });

    try {
      const res = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log('Login error response:', data);
        throw data;
      }

      const { token, user } = data.result;
      localStorage.setItem(this.tokenKey, token);

      this.store.setState({
        ...this.store.getState(),
        [this.name]: {
          token,
          user: user || null,
          loading: false,
          error: null,
        },
      });

      // Если user не пришел — подгружаем его отдельно
      if (!user) await this.fetchProfile();

      return true;
    } catch (error) {
      const normalizedError = this._normalizeError(error);
      console.log('Normalized error:', normalizedError);

      this.store.setState({
        ...this.store.getState(),
        [this.name]: {
          ...this.store.getState()[this.name],
          loading: false,
          error: normalizedError,
        },
      });

      return false;
    }
  }

  async logout() {
    const token = this.store.getState()[this.name].token;
    if (!token) return;

    this.store.setState({
      ...this.store.getState(),
      [this.name]: {
        ...this.store.getState()[this.name],
        loading: true,
      },
    });

    try {
      const res = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw data;
      }

      localStorage.removeItem(this.tokenKey);
      this.store.setState({
        ...this.store.getState(),
        [this.name]: {
          token: null,
          user: null,
          loading: false,
          error: null,
        },
      });
    } catch (error) {
      const normalizedError = this._normalizeError(error);
      this.store.setState({
        ...this.store.getState(),
        [this.name]: {
          ...this.store.getState()[this.name],
          loading: false,
          error: normalizedError, // Теперь тоже сохраняем всю ошибку
        },
      });
    }
  }

  async fetchProfile() {
    const token = this.store.getState()[this.name].token;
    if (!token) return;

    this.store.setState({
      ...this.store.getState(),
      [this.name]: {
        ...this.store.getState()[this.name],
        loading: true,
      },
    });

    try {
      const res = await fetch('/api/v1/users/self?fields=*', {
        headers: { 'X-Token': token },
      });

      if (!res.ok) {
        const data = await res.json();
        throw data;
      }

      const response = await res.json();
      const user = response.result;

      this.store.setState({
        ...this.store.getState(),
        [this.name]: {
          ...this.store.getState()[this.name],
          user,
          loading: false,
          error: null,
        },
      });
    } catch (error) {
      const normalizedError = this._normalizeError(error);
      this.store.setState({
        ...this.store.getState(),
        [this.name]: {
          ...this.store.getState()[this.name],
          loading: false,
          error: normalizedError, // И здесь сохраняем всю ошибку
        },
      });
    }
  }
  clearError() {
    this.store.setState({
      ...this.store.getState(),
      [this.name]: {
        ...this.store.getState()[this.name],
        error: null,
      },
    });
  }
  async checkTokenValidity(token) {
    try {
      // Делает запрос к API для проверки токена
      const res = await fetch('/api/v1/users/self?fields=*', {
        headers: { 'X-Token': token },
      });

      // Если ответ не ок (т.е. токен невалиден), выбрасываем ошибку
      if (!res.ok) {
        throw new Error('Токен невалиден');
      }

      const data = await res.json();

      // Если ответа нет, выбрасываем ошибку (например, пользователь не найден)
      if (!data.result) {
        throw new Error('Токен невалиден');
      }

      // Если токен валиден, обновляем состояние
      this.store.setState({
        ...this.store.getState(),
        [this.name]: {
          ...this.store.getState()[this.name],
          user: data.result, // Загружаем данные пользователя
          loading: false,
          error: null,
        },
      });
    } catch (error) {
      // Если токен невалиден, очищаем его из localStorage
      localStorage.removeItem(this.tokenKey);

      // Обновляем состояние, чтобы токен был удален
      this.store.setState({
        ...this.store.getState(),
        [this.name]: {
          ...this.store.getState()[this.name],
          token: null,
          user: null,
          loading: false,
          error: { message: error.message || 'Неизвестная ошибка' },
        },
      });
    }
  }
}
