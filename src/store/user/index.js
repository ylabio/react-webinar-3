import StoreModule from '../module';

/**
 * Детальная информация о пользователе
 */
class UserState extends StoreModule {
  initState() {
    return {
      data: {},
      waiting: false, // признак ожидания загрузки
      error: null,
      isAuth: JSON.parse(localStorage.getItem('isAuth'))
    };
  }

  /**
   * Авторизация пользователя
   * @param loginOptions {Object}
   * @return {Promise<void>}
   */
  async auth(loginOptions) {
    this.setState({
      data: {},
      error: null,
      waiting: true,
      isAuth: false
    })

    try {
      const response = await fetch(`/api/v1/users/sign?fields=*,profile(name)`, {
        method: 'POST',
        body: JSON.stringify(loginOptions),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }) 
      const json = await response.json()

      if(!response.ok) {
        throw new Error(json.error.data.issues[0].message)
      }

      localStorage.setItem('userToken', json.result.token)
      localStorage.setItem('isAuth', true);

      this.setState({
        ...this.getState(),
        data: json.result,
        isAuth: true,
        waiting: false
      }, 'Данные о пользователе при авторизации загружены из АПИ')

    } catch (error) {
      this.setState({
        ...this.getState(),
        waiting: false,
        error: error.message
      })
    }
  }

  /**
   * Отмена авторизации и удаление токена
   * @return {Promise<void>}
   */
  async resetAuth() {
    this.setState({
      ...this.getState(),
      error: null,
      waiting: true,
    })

    try {
      const token = localStorage.getItem('userToken')
      const response = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          'X-Token': token
        }
      })
      const json = await response.json()
      
      if(!response.ok) {
        throw new Error(json.error.data.issues[0].message)
      }

      localStorage.removeItem('userToken')
      localStorage.removeItem('isAuth');
      
      this.setState({
        ...this.getState(),
        data: {},
        waiting: false,
        isAuth: false,
      }, 'Данные о пользователе удалены')

    } catch(error) {
      this.setState({
        ...this.getState(),
        waiting: false,
        error: error.message
      })
    }  
  }

  resetError() {
    this.setState({
      ...this.getState(),
      error: null
    })
  }
}

export default UserState;
