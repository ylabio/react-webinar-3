import StoreModule from '../module';

const AUTH_TOKEN = 'YLab-shop-token';

export default class User extends StoreModule {
  initState() {
    return {
      authStatus: 'Unknown',
      userInfo: null
    }
  }

  async login({login, password}) {
    const data = JSON.stringify({login, password});
    const response = await fetch('/api/v1/users/sign', {
      method: 'POST',
      body: data,
      headers: {
        'Content-type': 'application/json'
      }
    });
    if (!response.ok) {
      const json = await response.json();
      const error = new Error();
      error.message = json.error.data.issues[0].message;
      throw error;
    } else {
      const json = await response.json();
      localStorage.setItem(AUTH_TOKEN, json.result.token);
      this.setState({
        ...this.getState(),
        userInfo: json.result.user,
        authStatus: 'Auth',
    });
    }
  }

  async logout() {
    await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'X-Token': localStorage.getItem(AUTH_TOKEN),
      }
    }),
    localStorage.removeItem(AUTH_TOKEN);
    this.setState({
      ...this.getState(),
      userInfo: null,
      authStatus: 'NoAuth'
    })
  }

  async checkAuth() {
    const response = await fetch('/api/v1/users/self', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'X-Token': localStorage.getItem(AUTH_TOKEN),
      }
    });
    if (!response.ok) {
      this.setState({
        ...this.getState(),
        authStatus: 'NoAuth',
      });
    } else {
      const json = await response.json();
      this.setState({
        ...this.getState(),
        userInfo: json.result,
        authStatus: 'Auth',
    })
    }
    
  }
}