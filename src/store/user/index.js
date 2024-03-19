import StoreModule from "../module";

/**
 * Состояние пользователя
 */
class UserState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      result: {},
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
    });
  }

  /**
   * Установка параметров авторизации пользователя
   */
  setIsLogged() {
    this.setState({
      ...this.getState(),
      isLogged: false
    })
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
        result: json.result,
        isLogged: true,
        error: null,
        waiting: false
      });
      
    } else {
      // Ошибка при загрузке данных
      this.setState({
        ...this.getState(),
        isLogged: false,
        error: json.error.data?.issues[0]?.message,
        waiting: false
      });
    }
  }

}

export default UserState;