import StoreModule from '../module';

/**
 * Детальная ифнормация о товаре для страницы товара
 */
class AuthState extends StoreModule {
  initState() {
    return {
      isChecked: false,
      isAuth: false,
      username: null,
      waiting: false,
      error: '',
    };
  }

  setError(message) {
    this.setState({
      isChecked: false,
      isAuth: false,
      username: null,
      waiting: false,
      error: message,
    });
  }

  async auth() {
    // console.log('AUTH');
    const token = localStorage.getItem('USER_TOKEN');
    if (!token) {
      this.setState({
        isChecked: true,
        isAuth: false,
        username: null,
        waiting: false,
        error: '',
      });
      return;
    }
    try {
      this.setState({
        ...this.getState(),
        waiting: true,
      });
      const response = await fetch(`/api/v1/users/self`, {
        headers: {
          ['X-Token']: token,
          ['Content-Type']: 'application/json',
        },
      });
      const json = await response.json();
      this.setState({
        isChecked: true,
        isAuth: true,
        username: json.result.profile.name,
        waiting: false,
        error: '',
      });
    } catch (error) {
      this.setState({
        isChecked: false,
        isAuth: false,
        username: null,
        waiting: false,
        error: '',
      });
    }
  }

  /**
   * Авторизация
   * @param data {object}
   * @return {Promise<void>}
   */
  async login(data) {
    // Установка признака ожидания загрузки
    this.setState({
      isChecked: false,
      isAuth: false,
      username: null,
      waiting: true,
      error: '',
    });

    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        headers: {
          ['Content-Type']: 'application/json',
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (json.error) {
        const errorMessages = json.error.data.issues
          .map((i) => i.message)
          .join('\n');
        throw new Error(errorMessages);
      }
      localStorage.setItem('USER_TOKEN', json.result.token);

      // Пользователь Авторизован
      this.setState(
        {
          isChecked: true,
          isAuth: true,
          username: json.result.user.profile.name,
          waiting: false,
          error: '',
        },
        'Пользователь Авторизован'
      );
    } catch (e) {
      // console.log(e.message);
      this.setState({
        isChecked: false,
        isAuth: false,
        waiting: false,
        username: null,
        error: e.message,
      });
    }
  }

  /**
   * Выход
   * @return {Promise<void>}
   */
  async logOut() {
    // Установка признака ожидания загрузки
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          ['X-Token']: localStorage.getItem('USER_TOKEN'),
          ['Content-Type']: 'application/json',
        },
      });

      this.setState({
        isChecked: true,
        isAuth: false,
        token: null,
        username: null,
        waiting: false,
      });
      localStorage.removeItem('USER_TOKEN');
    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        isChecked: true,
        isAuth: false,
        waiting: false,
      });
    }
  }
}

export default AuthState;
