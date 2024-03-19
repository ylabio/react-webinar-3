import StoreModule from "../module";

class LoginState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      data: {
        login: '',
        password: ''
      },
      token: '',
      validation: true,
      errorMessages: [],
      authorized: false
    }
  }

  /**
   * Инициализация параметров.
   * Восстановление localStorage
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async initParams(newParams = {}) {
    const token = window.localStorage.getItem('token');
    
    let validParams = {};

    if (token) {

      const response = await fetch('/api/v1/users/self?fields=profile,email', {
        method: 'GET',
        headers: {
          'X-Token': token,
          'accept': 'application/json'
        }
      });
      const json = await response.json();

      if (json.error) {
        const errors = json.error.data.issues
          .filter((error) => error.message)
          .map((error) => error.message)

        validParams.validation = false;
        validParams.errorMessages = errors;
      } else {
        validParams.token = token;
        validParams.authorized = true;
      }
    }
    await this.setParams({...this.initState(), ...validParams, ...newParams});
  }

  /**
   * Установка параметров
   * @param [newParams] {Object} Новые параметры
   * @returns {Promise<void>}
   */
  async setParams(newParams = {}) {
    // Установка новых параметров
    this.setState({
      ...this.getState(),
      ...newParams
    }, 'Установлены параметры авторизации');
  }

  /**
   * Авторизация
   * @param [newParams] {Object} Новые параметры
   * @returns {Promise<void>}
   */
  async logIn(newParams = {}) {
    this.setParams(newParams);

    let validParams = {};

    const data = this.getState().data

    const response = await fetch('/api/v1/users/sign?', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    const json = await response.json();

    if (json.error) {
      const errors = json.error.data.issues
        .filter((error) => error.message)
        .map((error) => error.message)

      validParams.validation = false;
      validParams.errorMessages = errors;
    } else {
      window.localStorage.setItem('token', json.result.token);

      validParams.token = json.result.token;
      validParams.validation = true;
      validParams.errorMessages = '';
      validParams.authorized = true;
    }
    await this.setParams({...this.getState(), ...validParams});
  }

  /**
   * Выход из профиля
   * @param {String} Токен
   * @returns {Promise<void>}
   */
  async logOut() {
    const token = this.getState().token
    const response = await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: {
        'X-Token': token,
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();
    if (json.result) {
      window.localStorage.removeItem('token')
      this.setState(this.initState());
    }
  }
}

export default LoginState;
