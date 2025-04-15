import { checkResponse } from '../../utils';
import StoreModule from '../module';

class UserState extends StoreModule {
  initState() {
    return {
      token: '',
      user: { profile: { name: '' } },
      isAuth: false,
      isError: false,
      isLoading: false,
      error: [],
    };
  }

  async login(form) {
    let response;
    let result;

    this.setState({ ...this.getState(), isLoading: true });
    response = await fetch('/api/v1/users/sign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    try {
      result = await checkResponse(response);
      localStorage.setItem('token', result.result.token);

      this.setState(
        {
          ...this.getState(),
          ...result.result,
          isAuth: true,
          isLoading: false,
          isError: false,
          error: [],
        },
        'Логин',
      );
    } catch (e) {
      this.setState({
        ...this.initState(),
        isLoading: false,
        isError: true,
        error: e.issues,
      });
    } finally {
      this.setState(
        {
          ...this.getState(),
          isLoading: false,
        },
        'Логин',
      );
    }
  }

  async checkAuth() {
    this.setState({ ...this.getState(), isLoading: true });

    try {
      const response = await fetch(`/api/v1/users/self`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': localStorage.getItem('token'),
        },
      });

      const result = await checkResponse(response);

      this.setState(
        {
          ...this.getState(),
          user: { ...result.result },
          isAuth: true,
          isError: false,
          error: [],
        },
        'Проверка авторизации',
      );
    } catch (e) {
      console.error(e);
      this.setState(
        {
          ...this.initState(),
        },
        'Проверка авторизации',
      );
    } finally {
      this.setState(
        {
          ...this.getState(),
          isLoading: false,
        },
        'Логин',
      );
    }
  }

  async logout() {
    this.setState({ ...this.getState(), isLoading: true });
    const token = localStorage.getItem('token');
    let response;
    let result;

    response = await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token,
      },
    });
    result = await response.json();

    localStorage.removeItem('token');

    this.setState(
      {
        ...this.initState(),
      },
      'Выход',
    );
  }
}

export default UserState;
