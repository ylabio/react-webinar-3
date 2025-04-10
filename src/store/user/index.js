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
      isAuth: false
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

      if (json.hasOwnProperty("error")) {
        throw new Error(json.error.data.issues[0].message)
      }

      this.setState({
        ...this.getState(),
        data: {
          username: json.result?.user.username,
          token: json.result.token
        },
        isAuth: true,
        waiting: false
      })

    } catch (error) {
      this.setState({
        ...this.getState(),
        waiting: false,
        error: error.message
      })
    }
  }
}

export default UserState;
