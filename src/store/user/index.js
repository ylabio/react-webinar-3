import StoreModule from '../module';
// import { withRouter } from 'react-router-dom';

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
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async signIn(username, password) {
    console.log('Проверка логина и пароля в классе', username, password);
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
      // window.location.href = '/';
    } catch (error) {
      console.log('Eррор', error, error.message);
      this.setState({
        data: {},
        waiting: false,
        error: error.message,
      });
    }
  }

  /**
   * Получение данных из профиля авторизованного пользователя
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async load() {
    // const { history } = withRouter();
    const token = localStorage.getItem('token');
    // const token = 'b8fb54ab5f70bda37360ddda36cd0ea2953d5e2818358c5380ea75ff32b9ad9c';

    // if (!token) {
    //   // window.location.href = '/login';
    //   console.log("Перенаправление");
    //   this.props.history.push('/login');
    // }

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
   * Установка параметров и загрузка списка товаров
   * @param [newParams] {Object} Новые параметры
   * @param [replaceHistory] {Boolean} Заменить адрес (true) или новая запись в истории браузера (false)
   * @returns {Promise<void>}
   */
  async signOut() {
    // const token = 'b8fb54ab5f70bda37360ddda36cd0ea2953d5e2818358c5380ea75ff32b9ad9c';
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
      // const json = await response.json();
      // Сохраняем токен в localStorage
      // localStorage.setItem('X-Token', data.token);
      this.setState({
        data: {},
        waiting: false,
      }, 'Выход из системы')
      console.log('Успешный выход');
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
