import StoreModule from '../module';

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class LoginState extends StoreModule {
  initState() {
    return {
      isAuth: null,
      error: '',
    };
  }

  async login(login, password) {
    const payload = { login, password };
    const response = await fetch('/api/v1/users/sign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const json = await response.json();

    if (response.status === 200) {
      localStorage.setItem('token', json.result.token);

      this.setState(
        {
          ...this.getState(),
          isAuth: true,
          error: '',
        },
        'Авторизация',
      );
    } else {
      this.setState(
        {
          ...this.getState(),
          error: json.error.data.issues[0].message,
        },
        'Ошибка авторизации',
      );
    }
  }

  async checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.setState({ isAuth: false }, 'Токен отсутствует');
      return;
    }
    const response = await fetch('/api/v1/users/self?fields=email', {
      headers: {
        'X-Token': token,
        'Content-Type': 'application/json',
      },
    });

    this.setState({ isAuth: response.status === 200 }, 'Проверка авторизации');
  }

  async logout() {
    const response = await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: {
        'X-Token': localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      localStorage.removeItem('token');

      this.setState(
        {
          ...this.getState(),
          isAuth: false,
        },
        'Выход',
      );
    }
  }

  resetError() {
    this.setState(
      {
        ...this.getState(),
        error: '',
      },
      'Сброс ошибки',
    );
  }
}

export default LoginState;
