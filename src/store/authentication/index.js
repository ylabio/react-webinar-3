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

    if (!login.trim() || !password.trim()) {
      this.setState(
        {
          ...this.getState(),
          waiting: false,
          error: 'Логин и пароль не могут быть пустыми',
        },
        'Ошибка валидации',
      );
      return;
    }

    this.setState(
      {
        ...this.getState(),
        waiting: true,
        error: null,
      },
      'Начало авторизации',
    );

    try {
      const response = await fetch('api/v1/users/sign', {
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
      await fetch('api/v1/users/sign', {
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
}

export default UserState;
