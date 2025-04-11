import StoreModule from '../module';

/**
 * Состояние авторизации
 */
class AuthState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: null,
      error: null,
      isAuthChecked: false,
    };
  }

  /**
   * Авторизация пользователя
   * @param login {String} Логин пользователя
   * @param password {String} Пароль пользователя
   * @return {Promise<void>}
   */
  async signIn(login, password) {
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        const errorMessage = data.error?.data?.issues[0]?.message || 'Ошибка авторизации';

        throw new Error(errorMessage);
      }

      const json = await response.json();

      const { token, user } = json.result;

      // Сохраняем токен в локальное хранилище
      localStorage.setItem('authToken', token);

      // Устанавливаем профиль пользователя
      this.setState(
        {
          user,
          isAuthChecked: true,
          error: null,
        },
        'Успешная авторизация',
      );
    } catch (error) {
      this.setState(
        {
          user: null,
          isAuthChecked: true,
          error: error.message,
        },
        'Ошибка авторизации',
      );
    }
  }

  /**
   * Выход пользователя
   * @return {Promise<void>}
   */
  async signOut() {
    try {
      const token = localStorage.getItem('authToken');

      const response = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Ошибка выхода');
      }

      localStorage.removeItem('authToken');

      this.setState(
        {
          user: null,
          error: null,
          isAuthChecked: true,
        },
        'Успешный выход',
      );
    } catch (error) {
      this.setState(
        {
          user: null,
          error: error.message,
          isAuthChecked: true,
        },
        'Ошибка выхода',
      );
    }
  }

  /**
   * Загрузка пользователя
   * @return {Promise<void>}
   */
  async getUser() {
    try {
      const token = localStorage.getItem('authToken');

      const response = await fetch('/api/v1/users/self?fields=*', {
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Ошибка загрузки профиля');
      }

      const json = await response.json();
      const user = json.result;

      // Устанавливаем профиль пользователя
      this.setState(
        {
          user,
          error: null,
          isAuthChecked: true,
        },
        'Профиль загружен',
      );
    } catch (error) {
      this.setState(
        {
          user: null,
          error: error.message,
          isAuthChecked: true,
        },
        'Ошибка загрузки профиля',
      );
    }
  }

  /**
   * Проверка авторизации по токену
   * @return {Promise<void>}
   */
  async checkAuth() {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        await this.getUser();
      } else {
        this.setState(
          {
            user: null,
            error: null,
            isAuthChecked: true,
          },
          'Пользователь не авторизован',
        );
      }
    } catch (error) {
      this.setState(
        {
          user: null,
          error: error.message,
          isAuthChecked: true,
        },
        'Ошибка проверки авторизации',
      );
    }
  }

  setError(error) {
    this.setState({
      ...this.getState(),
      error,
    });
  }
}

export default AuthState;
