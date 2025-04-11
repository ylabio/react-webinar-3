import StoreModule from '../module';

class UserState extends StoreModule {
  initState() {
    return {
      token: null,
      result: null,
      waiting: false,
      error: null,
    };
  }
  setError(error) {
    this.setState(
      {
        ...this.getState(),
        error,
      },
      'Ошибка обновлена',
    );
  }

  async login(credentials) {
    const { login, password } = credentials;

    this.setState(
      {
        ...this.getState(),
        waiting: true,
        error: null,
      },
      'Начало авторизации',
    );

    try {
      const response = await fetch('http://query.rest/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login,
          password,
          remember: true,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData?.error?.data?.issues?.[0]?.message || 'Ошибка авторизации';

        throw new Error(errorMessage);
      }

      const data = await response.json();

      if (data.result && data.result.token) {
        const { token } = data.result;

        localStorage.setItem('authToken', token);

        this.setState(
          {
            ...this.getState(),
            token,
            waiting: false,
            error: null,
          },
          'Авторизация успешна',
        );
      } else {
        throw new Error('Токен не найден в ответе сервера');
      }
    } catch (error) {
      this.setState(
        {
          ...this.getState(),
          waiting: false,
          error: error.message,
        },
        'Ошибка авторизации',
      );
    }
  }

  async logout() {
    const { token } = this.getState();

    this.setState(
      {
        ...this.getState(),
        waiting: true,
      },
      'Начало выхода',
    );

    try {
      await fetch('http://query.rest/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });

      localStorage.removeItem('authToken');
      this.setState(
        {
          ...this.initState(),
        },
        'Выход выполнен',
      );
    } catch (error) {
      this.setState(
        {
          ...this.getState(),
          waiting: false,
          error: error.message,
        },
        'Ошибка выхода',
      );
    }
  }

  checkAuth() {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.setState(
          {
            ...this.getState(),
            token,
          },
          'Токен восстановлен',
        );
        this.fetchUserProfile();
      } else {
        this.setState(
          {
            ...this.initState(),
          },
          'Пользователь не авторизован',
        );
      }
    } catch (error) {
      this.setState(
        {
          ...this.initState(),
          error: error.message,
        },
        'Ошибка проверки авторизации',
      );
    }
  }

  async fetchUserProfile() {
    const { token } = this.getState();

    if (!token) {
      console.error('Пользователь не авторизован');
      return;
    }

    this.setState(
      {
        ...this.getState(),
        waiting: true,
      },
      'Загрузка профиля',
    );

    try {
      const response = await fetch('http://query.rest/api/v1/users/self?fields=*', {
        method: 'GET',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка загрузки профиля');
      }

      const data = await response.json();

      this.setState(
        {
          ...this.getState(),
          result: data.result,
          waiting: false,
          error: null,
        },
        'Профиль загружен',
      );
    } catch (error) {
      this.setState(
        {
          ...this.getState(),
          waiting: false,
          error: error.message,
        },
        'Ошибка загрузки профиля',
      );
    }
  }
}

export default UserState;
