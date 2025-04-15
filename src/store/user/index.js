import StoreModule from '../module';

/**
 * Состояние пользователя - информация о пользователе
 */
class UserState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    console.log('user initState');
    return {
      data: {},
      waiting: false,
      error: '',
      // autenticated: true,
    };
  }

  /**
   * Аутентификация пользователя
   * по логину и паролю
   * @param username String логин
   * @param password String пароль
   * @return {Promise<void>}
   */
  async signIn(username, password, navigate) {
    console.log('user signIn');
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login: username, password: password }),
      });

      if (!response.ok) {
        throw new Error('Ошибка аутентификации');
      }

      const json = await response.json();
      
      localStorage.setItem('token', json.result.token);

      this.setState({
        data: json.result,
        waiting: false,
        error: '',
        autenticated: true,
      }, 'Вход выполнен');
      navigate('/');
    } catch (error) {
      this.setState({
        data: {},
        waiting: false,
        error: error.message,
      });
    }
  };

  /**
   * Получение данных из профиля авторизованного пользователя
   * @return {Promise<void>}
   */
  async load() {
    console.log('user load');
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch('/api/v1/users/self?fields=*', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        },
      });

      if (!response.ok) {
        throw new Error('Ошибка загрузки данных о пользователе');
      }

      const json = await response.json();

      this.setState({
        data: json.result,
        waiting: false,
        autenticated: true,
      }, 'Загружены данные пользователя из АПИ')
    } catch (error) {
      this.setState({
        data: {},
        waiting: false,
        autenticated: false,
      });
    }
  };

  /**
   * Выход из системы
   * @returns {Promise<void>}
   */
  async signOut() {
    console.log('user signOut');
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Token': token,
        },
      });

      if (!response.ok) {
        throw new Error('Ошибка при выходе из системы');
      }
      localStorage.removeItem('token');
      this.setState({
        data: {},
        waiting: false,
      }, 'Выход из системы')
      window.location.href = '/';
    } catch (error) {
      this.setState({
        data: {},
        waiting: false,
      });
    }
  };

  /**
   * Проверка авторизации
   * @returns {Promise<void>}
   */
  checkAuth() {
    console.log('user checkAuth');
    const token = localStorage.getItem('token');
    try {
      if (token) {
        this.setState({
          autenticated: true,
        }, 'Пользователь авторизован');
      } else {
        this.setState({
          data: {},
          waiting: false,
          error: '',
          autenticated: false,
        }, 'Пользователь не авторизован');
      }
    } catch (error) {
      this.setState({
        data: {},
        waiting: false,
        error: error.message,
      });
    }
  };
}

export default UserState;
