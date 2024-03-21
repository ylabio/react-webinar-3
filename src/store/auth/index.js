import StoreModule from '../module';

class AuthState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      isAuthChecked: false,
      user: null,
      waiting: false,
    };
  }
  async signIn(data) {
    this.setState(
      {
        ...this.getState(),
        waiting: true,
      },
      'отправка данных пользователя'
    );

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();

      if (!response.ok) {
      throw new Error(json.error.data.issues[0].message)
      }

      this.setState(
        {
          ...this.getState(),
          isAuthChecked: true,
          user: json.result.user,
          waiting: false,
        }, 'запись данных пользователя');
      localStorage.setItem('token', json.result.token);

    } catch (err) {
      this.setState(
        {
          ...this.getState(),
          isAuthChecked: true,
          user: null,
          waiting: false,
        }, 'ошибка авторизации');
      localStorage.removeItem('token');
      throw err
    }
  }
  async signOut() {
    try {
      await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'X-Token': localStorage.getItem('token'),
        }
      });

      this.setState(
        {
          ...this.getState(),
          user: null,
          waiting: false,
        });
      localStorage.removeItem('token');
    } catch (error) {
      console.error(error);
    }
  }
  async checkUserAuth() {
    this.setState(
      {
        ...this.getState(),
        waiting: true,
      },
      'отправка запроса на проверку пользователя'
    );

    try {
      const response = await fetch('/api/v1/users/self', {
        headers: {
          'X-Token': localStorage.getItem('token')
        }
      });
      const json = await response.json();

      if (!response.ok) {
      throw console.error(json.error.data.issues[0].message)
      }

      this.setState(
        {
          ...this.getState(),
          isAuthChecked: true,
          user: json.result,
          waiting: false,
        }, 'пользователь нашелся');

    } catch (err) {
      this.setState(
        {
          ...this.getState(),
          isAuthChecked: true,
          user: null,
          waiting: false,
        }, 'ошибка авторизации');
      localStorage.removeItem('token');
    }
  }

  setAuthUser(boolean) {
    this.setState(
      {
        ...this.getState(),
        isAuthChecked: boolean,
      },
      'первая загрузка страницы'
    );
  }

  getToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.checkUserAuth();
    } else {
      this.setAuthUser(true)
    }
  }
}

export default AuthState;
