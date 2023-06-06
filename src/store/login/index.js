import StoreModule from '../module'

/**
 * Детальная ифнормация о пользователе
 */
class LoginState extends StoreModule {
  initState() {
    return {
      user: {},
      login: '',
      authorization: localStorage.getItem('token') ? true : false,
      waiting: false,
      error: '',
    }
  }

  /**
   * Авторизация
   * @param {string} login
   * @param {string} password
   * @return {Promise<void>}
   */
  async getAuthorization(login, password) {
    // Установка признака ожидания загрузки
    this.setState({
      waiting: true,
    })
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: login,
          password: password,
        }),
      })
      const json = await response.json()

      this.setState({
        ...this.getState(),
        user: json.result,
        authorization: true,
        waiting: false
      })
      localStorage.setItem('token', json.result.token)
      localStorage.setItem('userName', json.result.user.profile.name)
    } catch (e) {
      // Авторизация с ошибкой
      this.setState({
        ...this.getState(),
        authorization: false,
        waiting: false,
        error: e.message,
      })
    }
  }

  /**
   * Выход
   * @return {Promise<void>}
   */
  async deleteUser() {
    // Установка признака ожидания загрузки
    this.setState({
      waiting: true,
    })
    const tokenUser = localStorage.getItem('token')
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'X-Token': tokenUser,
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json()

      // Выход успешен
      this.setState({
        ...this.getState(),
        authorization: false,
        waiting: false
      })
      localStorage.removeItem('token')
    } catch (e) {
      console.log('Во время выхода произошла ошибка')
    }
  }

   /**
   * Профиль пользователя
   * @return {Promise<void>}
   */
   async getUserProfile() {
    // Установка признака ожидания загрузки
    this.setState({
      ...this.getState(),
      waiting: true,
    })
    const tokenUser = localStorage.getItem('token')
    try {
      const response = await fetch('/api/v1/users/self', {
        method: 'GET',
        headers: {
          'X-Token': tokenUser,
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json()
      json.result.profile.email = json.result.email
      this.setState({
        ...this.getState(),
        profile: json.result.profile,
        waiting: false,
      })
    } catch (e) {
      console.log('Oшибка')
    }
  }
}

export default LoginState
