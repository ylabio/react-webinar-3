import StoreModule from '../module';

/**
 * Детальная информация о товаре для страницы товара
 */
class UserState extends StoreModule {
  initState() {
    const token = localStorage.getItem('token');
    return {
      token: token || '',
      user: {},
      loading: false,
      error: '',
    };
  }

  async initUser() {
    const { token } = this.getState();
    token && (await this.fetchUser(token));
  }

  async login({ login, password }) {
    console.log({ login, password });

    const response = await fetch('/api/v1/users/sign?fields=*', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password: password }),
    });
  
    const json = await response.json();

  
    if (!response.ok) {
      this.setState({ 
        ...this.getState(), 
        error: json.error?.data.issues[0].message || 'error login '
      });
      return { error: json.error?.data.issues[0].message };
    }
  
    const { token, user } = json.result;
    localStorage.setItem('token', token);
  
    this.setState({
      ...this.getState(),
      token,
      user,
      error: null
    }, 'Вход выполнен');
  
    return { success: true };
  }

  logout() {
    localStorage.removeItem('token');
    this.setState(
      {
        ...this.getState(),
        token: '',
        user: {},
        error: '',
      },
      'Выход выполнен',
    );
  }

  async fetchUser(token) {
    try {
      this.setState({ ...this.getState(), loading: true });

      const response = await fetch('/api/v1/users/self?fields=*', {
        method: 'GET',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });

      const responseJson = await response.json();
      this.setState({
        ...this.getState(),
        user: responseJson.result,
        loading: false,
      });
    } catch (e) {
      this.setState({
        ...this.getState(),
        loading: false,
        error: e.message,
      });
    }
  }
}

export default UserState;
