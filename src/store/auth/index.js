import StoreModule from '../module';

class AuthState extends StoreModule {
  initState() {
    return {
      user: JSON.parse(localStorage.getItem('user')) || {},
      token: localStorage.getItem('token') || null,
      error: null,
      waiting: false,
    };
  }

  async signIn(login, password) {
    try {
      const response = await fetch(`api/v1/users/sign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        this.setState({
          ...this.getState(),
          error: json.error?.data.issues || 'error login ',
        });
        return { error: json.error?.data.issues };
      }

      const { token, user } = json.result;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      this.setState(
        {
          ...this.getState(),
          token,
          user,
          error: null,
          waiting: false,
        },
        'Вход в аккаунт',
      );

      return { success: true };
    } catch (error) {
      this.setState({
        ...this.getState(),
        error: error.message,
        waiting: false,
      });
      return { error: error.message };
    }
  }

  async signOut() {
    this.setState({ ...this.getState(), waiting: true });

    try {
      const { token } = this.getState();

      if (token) {
        const response = await fetch('/api/v1/users/sign', {
          method: 'DELETE',
          headers: {
            'X-Token': token,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Ошибка при выходе из аккаунта');
        }
      }

      // Очищаем localStorage только после успешного выхода
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Сбрасываем состояние
      this.setState(
        {
          user: {},
          token: null,
          waiting: false,
          error: null,
        },
        'Выход пользователя',
      );
    } catch (error) {
      console.error('Ошибка при выходе:', error);

      this.setState({
        ...this.getState(),
        error: error.message,
        waiting: false,
      });
    }
  }

  async fetchUser(token) {
    this.store.setState({
      ...this.store.getState(),
      waiting: false,
    });

    try {
      const response = await fetch('/api/v1/users/self?fields=*', {
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error?.message || 'Ошибка загрузки пользователя');
      }

      const user = json.result;
      localStorage.setItem('user', JSON.stringify(user));

      this.store.setState({
        ...this.store.getState(),
        user,
        waiting: false,
      });
    } catch (err) {
      this.store.setState({
        ...this.store.getState(),
        waiting: false,
      });
    }
  }

  async checkAuth() {
    const { token } = this.getState();
    if (token) {
      await this.fetchUser(token);
    }
  }
}
export default AuthState;
