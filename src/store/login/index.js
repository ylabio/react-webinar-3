import StoreModule from '../module';

/**
 * Авторизация пользователя
 */

class Login extends StoreModule {

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
        this.setState({
          ...this.getState(),
          error: json.error.message,
        }, 'Пользователь не авторизован');
        return false;
      }

      localStorage.setItem('X-Token', json.result.token);
      this.setState({
        ...this.getState(),
        error: '',
        authLogin: true,
      }, 'Пользователь авторизован');
      
      return true;

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
   *Отправка данных на сервер для получения данных пользователя
   */
   async getDataUser () {

    const token = localStorage.getItem('X-Token');

    this.setState({
      ...this.getState(),
      waiting: true
    }, 'Получен токен пользователя');

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
        name: json.result.profile.name,
        phone: json.result.profile.phone,
        email: json.result.email
      },
      waiting: false
    }, 'Загружены данные пользователя из АПИ');

  }
}

export default Login;