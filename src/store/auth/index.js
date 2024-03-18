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
   * Сброс состояния до начального
   * @return {Object}
   */
  resetState() {
    this.setState({
      ...this.getState(),
      user: {},
      token: '',
      isLogged: false,
      error: null,
      waiting: false
    })
  }

  /**
   * Установка параметров загрузки
   */
  setWaiting() {
    this.setState({
      ...this.getState(),
      waiting: true
    });
  }

  /**
   * Авторизация пользователя
   * @param 
   * @returns {Promise<void>}
   */
  async signIn(data) {
    this.setWaiting();

    const response = await fetch('/api/v1/users/sign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const json = await response.json();

    // Данные успешно загружены
    if (response.ok) {
      this.setState({
        ...this.getState(),
        token: json.result.token,
        user: json.result.user,
        isLogged: true,
        error: null,
        waiting: false
      });
      localStorage.setItem('token', this.getState().token);

    } else {
      // Ошибка при загрузке данных
      this.setState({
        ...this.getState(),
        error: json.error.data?.issues[0]?.message,
        isLogged: false,
        waiting: false
      });
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

    // Данные успешно загружены
    if (response.ok) {
      this.setState({
        ...this.getState(),
        user: json.result,
        isLogged: true,
        error: null,
        waiting: false
      });
      
    } else {
      // Ошибка при загрузке данных
      console.log(json);
      this.setState({
        ...this.getState(),
        isLogged: false,
        error: json,
        waiting: false
      });
    }
  }

  /**
   * Выход из личного кабинета
   * @param {String} token 
   */
  async signOut(token) {
    this.setWaiting();
    
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token
        }
      })

      // При успешном ответе сбрасываем состояние
      this.resetState();
      localStorage.removeItem('token');

    } catch (error) {
      // Ошибка при загрузке
      this.setState({
        ...this.getState(),
        error: error,
        waiting: false
      }); 
    }

  }
}

export default AuthState;