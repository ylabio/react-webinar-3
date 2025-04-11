import StoreModule from '../module';

/**
 * Состояние пользователя
 */
class User extends StoreModule {

  initState() {
    this.#getUser();
    return {
      user: null,
      error: null,
    };
  }

  async logIn(login, password) {
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.error.message || 'Ошибка авторизации';
        throw new Error(errorMessage);
      }

      localStorage.setItem('react-webinar-3_auth_token', data.result.token);

      this.setState({
        user: data.result.user,
        error: null,
      },
      'Авторизация прошла успешно',);
    } catch(error) {
      this.setState({
        user: null,
        error: error.message,
      },
      'Ошибка авторизации',);
    }
  }

  async logOut() {
    try {
      const token = localStorage.getItem('react-webinar-3_auth_token');

      const response = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorMessage = 'Ошибка Выхода';
        throw new Error(errorMessage);
      }

      localStorage.removeItem('react-webinar-3_auth_token');

      this.setState({
        user: null,
        error: null,
      },
      'Выход прошол успешно',); 
    } catch(error) {
      console.error(error);
    }
  }

  async #getUser() {
    try {
      const token = localStorage.getItem('react-webinar-3_auth_token');

      const response = await fetch('/api/v1/users/self?fields=*', {
        method: 'GET',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = 'Ошибка получения данных пользователя';
        throw new Error(errorMessage);
      }

      this.setState({
        user: data.result,
        error: null,
      },
      'Авторизация прошла успешно',);
    } catch(error) {
      this.setState({
        user: null,
        error: null,
      },
      'Ошибка авторизации',);
      console.error(error);
    }
  }
}

export default User;
