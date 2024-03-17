import { redirect } from "react-router-dom";
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
      email: '',
      name: '',
      phone: '',
      token: '',
      validation: true,
      errorMessage: '',
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

      validParams.token = token;
      validParams.email = json.result.email;
      validParams.phone = json.result.profile.phone;
      validParams.name = json.result.profile.name;
      validParams.authorized = true;
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
    }, 'Установлены параметры авторизаии');
  }

  /**
   * Авторизация
   * @param [newParams] {Object} Новые параметры
   * @returns {Promise<void>}
   */
  async logIn(newParams = {}) {
    this.setParams(newParams);

    const data = this.getState().data

    const response = await fetch('/api/v1/users/sign?', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    const json = await response.json();

    if (json.error) {
      this.setState({
        ...this.getState(),
        validation: false,
        errorMessage: json.error.message,
      })
    } else {
      window.localStorage.setItem('token', json.result.token);

      this.setState({
        ...this.getState(),
        token: json.result.token,
        email: json.result.user.email,
        name: json.result.user.profile.name,
        phone: json.result.user.profile.phone,
        validation: true,
        errorMessage: '',
        authorized: true,
      })
    }
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
