import StoreModule from '../module';

class UserProfile extends StoreModule {
  initState() {
    return {
      user: null,
      isAuth: false,
      error: null,
      waiting: false,
      token: null,
    };
  }

  async login({ login, password }) {
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
        user: json.result.user,
        token: json.result.token,
        isAuth: true,
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
        token: null,
        user: null,
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
        user: json.result,
        token: localStorage.getItem('token'),
        isAuth: true,
      });

      return json.result;
    } catch (error) {
      console.error(error.message);

      this.setState({
        ...this.getState(),
        waiting: false,
        isAuth: false,
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

export default UserProfile;
