import StoreModule from "../module";

/**
 * Состояние аутентификации
 */
class AuthState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: {},
      token: localStorage.getItem('token') || '',
      isLogged: false,
      error: null,
      waiting: false
    }
  }

  /**
   * Установка параметров загрузки
   */
  setWaiting() {
    this.setState({
      ...this.getState(),
      waiting: true
    }, 'Загрузка...');
  }

  /**
   * Авторизация пользователя
   * @param [newParams] {Object} Новые параметры
   * @returns {Promise<void>}
   */
  async signIn(params) {
    this.setWaiting();

    const response = await fetch('/api/v1/users/sign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    const json = await response.json();

    if (response.ok) {
      this.setState({
        ...this.getState(),
        token: json.result.token,
        user: json.result.user,
        isLogged: true,
        error: null,
        waiting: false
      }, 'Загружен данные о пользователе из АПИ');
      localStorage.setItem('token', this.getState().token);
    } else {
      this.setState({
        ...this.getState(),
        error: json.error.message,
        isLogged: false,
        waiting: false
      }, 'Выводим данные об ошибке');
    }
  }

  /**
   * Получение данных пользователя
   * @param {String} token
   */
  async loadUser(token) {
    this.setWaiting();

    const response = await fetch('/api/v1/users/self?fields=*', {
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token
      }
    })
    const json = await response.json();

    this.setState({
      ...this.getState(),
      user: json.result,
      isLogged: true,
      error: null,
      waiting: false
    }, 'Загружен данные о пользователе из АПИ');
  }

  /**
   * Выход из личного кабинета
   * @param {String} token 
   */
  async signOut(token) {
    const response = await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token
      }
    })

    if (response.ok) {
      this.setState({
        ...this.getState(),
        user: {},
        token: '',
        isLogged: false,
        error: null,
        waiting: false
      }, 'Выход из личного кабинета');
      localStorage.removeItem('token');
    }

  }
}

export default AuthState;