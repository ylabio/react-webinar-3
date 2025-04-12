import StoreModule from '../module';

class AuthState extends StoreModule {
  initState() {
    return {
      userName: null,
      isAuth: false,
      error: null,
      waiting: false,
    };
  }

  async login({ login, password }, onSuccess) {
    this.setState({
      ...this.getState(),
      waiting: true,
      error: null,
    });
    try {
      const response = await fetch('api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error.data.issues[0].message || 'Ошибка авторизации');
      }
      localStorage.setItem('token', json.result.token);

      this.setState({
        ...this.getState(),
        waiting: false,
        userName: json.result.user.profile.name,
        isAuth: true,
      });

      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    } catch (error) {
      console.error(error.message);

      this.setState({
        ...this.getState(),
        waiting: false,
        error: error.message,
      });
    }
  }

  async logout(token) {
    this.setState({
      ...this.getState(),
      waiting: true,
      error: null,
    });
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        },
      });

      if (!response.ok) {
        throw new Error('Ошибка выхода');
      }

      localStorage.removeItem('token');

      this.setState({
        ...this.getState(),
        waiting: false,
        userName: null,
        isAuth: false,
      });
    } catch (error) {
      console.error(error.message);
      this.setState({
        ...this.getState(),
        waiting: false,
        error: error.message,
      });
    }
  }

  async checkAuth(token) {
    this.setState({
      ...this.getState(),
      waiting: true,
      error: null,
    });
    try {
      const response = await fetch('/api/v1/users/self?fields=*', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        },
      });
      if (!response.ok) {
        throw new Error('Ошибка не авторизован');
      }
      const json = await response.json();

      this.setState({
        ...this.getState(),
        waiting: false,
        userName: json.result.profile.name,
        isAuth: true,
      });

      return json.result;
    } catch (error) {
      console.error(error.message);

      this.setState({
        ...this.getState(),
        waiting: false,
        error: error.message,
      });
    }
  }

  removeError() {
    this.setState({
      ...this.getState(),
      error: null,
    });
  }
}

export default AuthState;
