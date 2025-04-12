import StoreModule from '../module';

class UserState extends StoreModule {
  initState() {
    return {
      token: '',
      profile: { name: '' },
      isAuth: false,
      request: false,
    };
  }

  async login(form) {
    let response;
    let result;
    try {
      this.setState({ ...this.getState(), request: true });
      response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      result = (await response.json()).result;
      localStorage.setItem('token', result.token);

      this.setState(
        {
          ...this.getState(),
          ...result,
          isAuth: true,
          request: false,
        },
        'Логин',
      );
    } catch (e) {}
  }

  async checkAuth() {
    this.setState({ ...this.getState(), request: true });
    const token = localStorage.getItem('token');
    let response;
    let result;
    try {
      response = await fetch(`/api/v1/users/self`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        },
      });
      result = (await response.json()).result;
      this.setState(
        {
          ...this.getState(),
          ...result,
          isAuth: true,
          request: false,
        },
        'Проверка авторизации',
      );
    } catch (e) {}
  }

  async logout() {
    this.setState({ ...this.getState(), request: true });
    const token = localStorage.getItem('token');
    let response;
    let result;
    try {
      response = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        },
      });
      result = await response.json();

      localStorage.removeItem('token');

      if (Object.hasOwnProperty(result, 'error')) throw new Error(result);

      this.setState(
        {
          ...this.initState(),
        },
        'Выход',
      );
    } catch (e) {}
  }
}

export default UserState;
