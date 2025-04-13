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
    return {
      data: {},
      waiting: false,
      error: '',
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
    const token = localStorage.getItem('token');
    // console.log('Где мой токен', token);
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
      }, 'Загружены данные пользователя из АПИ')

    } catch (error) {
      this.setState({
        data: {},
        waiting: false,
      });
    }
  };

  /**
   * Выход из системы
   * @returns {Promise<void>}
   */
  async signOut() {
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
}

export default UserState;
