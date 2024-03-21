import StoreModule from '../module';

/**
 * Авторизация пользователя
 */

class LoginState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      authLogin: false,
      profile: {},
      waiting: false,
      error: ''
    }
  }

  /**
   *Отправка данных на сервер для авторизации пользователя по логину и паролю
   */
  async loginUser (authUser) {
    // debugger

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        // body: JSON.stringify({
        //   "login": "test_1",
        //   "password": "123456",
        //   // "remember": true
        // })
        body: JSON.stringify(authUser)
      });
      
      const json = await response.json();
      
      if (json.error) {
        const error = json.error.data?.issues[0]?.message || json.error.message;
        this.setState({
          ...this.getState(),
          error: error,
        }, 'Пользователь не авторизован');
        return false;
      }

      localStorage.setItem('X-Token', json.result.token);
      this.setState({
        ...this.getState(),
        error: '',
        authLogin: true,
      }, 'Пользователь авторизован');
      
      const result = history.length > 2 ? 2 : 1;

      return result;

    } catch (ev) {
      console.log(ev);
    }

  }

  /**
   *Отправка данных на сервер для отмены авторизации пользователя и удаления токена
   */
   async signOutUser () {

    const token = localStorage.getItem('X-Token');
    localStorage.removeItem('X-Token');

    const response = await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token
      },
      
    });

    this.setState({
      ...this.getState(),
      authLogin: false
    }, 'Удалена авторизация пользователя');

  }

  /**
   *Проверка авторизации пользователя
   */
   async checklogin () {

    this.setState({
      ...this.getState(),
      waiting: true
    }, 'Проверяем токен пользователя');

    const token = localStorage.getItem('X-Token');

    if (token) {
      const response = await fetch('/api/v1/users/self?fields=*', {
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token
        },
      });
      
      const json = await response.json();

      this.setState({
        ...this.getState(),
        profile: {
          ...this.getState().profile,
          name: json.result.profile.name,
        },
        authLogin: true,
        waiting: false
      }, 'Проверена авторизация пользователя');

    } else {
      this.setState({
        ...this.getState(),
        waiting: false
      }, 'Проверена авторизация пользователя');
    }
  }

  /**
   *Удаление ошибки авторизации
   */
  deleteError () {
    this.setState({
      ...this.getState(),
      error: ''
    }, 'Удалена ошибка авторизации');
  }

}

export default LoginState;