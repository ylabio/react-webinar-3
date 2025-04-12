import StoreModule from '../module';

/**
 * Состояние пользователя
 */
class UserState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      profile: null,
      waiting: false,
      error: null,
    };
  }

  /**
   * Авторизация пользователя
   * @param login {String} Логин пользователя
   * @param password {String} Пароль пользователя
   * @return {Promise<void>}
   */
  async login({ login, password }) {
    // Сброс ошибки и установка признака ожидания загрузки
    this.setState({
      ...this.getState(),
      waiting: true,
      error: null,
    });

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        const errorMessage = json.error?.data?.issues[0]?.message;

        this.setState(
          {
            profile: null,
            error: errorMessage,
            waiting: false,
          },
          'Не удалось авторизоваться',
        );

        throw new Error(errorMessage);
      }

      const { token, user } = json.result;
      localStorage.setItem('authToken', token);

      // Устанавливаем профиль пользователя
      this.setState(
        {
          profile: user,
          waiting: false,
          error: null,
        },
        'Успешная авторизация',
      );
    } catch (error) {
      console.log(error);
      this.setState(
        {
          profile: null,
          error: error.message,
          waiting: false,
        },
        'Не удалось авторизоваться',
      );
    }
  }

  /**
   * Загрузка профиля
   * @return {Promise<void>}
   */
  async loadProfile() {
    this.setState({
      ...this.getState(),
      waiting: true,
      error: null,
    });

    try {
      const token = localStorage.getItem('authToken');

      const response = await fetch('/api/v1/users/self?fields=*', {
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorMessage = json.error?.data?.issues[0]?.message;

        this.setState(
          {
            profile: null,
            error: errorMessage,
            waiting: false,
          },
          'Ошибка загрузки профиля',
        );

        throw new Error('Ошибка загрузки профиля');
      }

      const json = await response.json();
      const profile = json.result;

      // Устанавливаем профиль пользователя
      this.setState(
        {
          profile,
          error: null,
          waiting: false,
        },
        'Профиль успешно загружен',
      );
    } catch (error) {
      this.setState(
        {
          profile: null,
          error: error.message,
          waiting: false,
        },
        'Ошибка загрузки профиля',
      );
    }
  }

  /**
   * Выход пользователя
   * @return {Promise<void>}
   */
  async logout() {
    this.setState({
      ...this.getState(),
      waiting: true,
      error: null,
    });

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
        const errorMessage = json.error?.data?.issues[0]?.message;

        this.setState(
          {
            ...this.getState(),
            error: errorMessage,
            waiting: false,
          },
          'Ошибка выхода',
        );

        throw new Error('Ошибка выхода');
      }

      localStorage.removeItem('authToken');

      this.setState(
        {
          profile: null,
          error: null,
          waiting: false,
        },
        'Успешный выход',
      );
    } catch (error) {
      this.setState(
        {
          ...this.getState(),
          error: error.message,
          waiting: false,
        },
        'Ошибка выхода',
      );
    }
  }
}

export default UserState;
