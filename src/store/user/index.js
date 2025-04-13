import StoreModule from '../module';

/**
 * Детальная информация о пользователе
 */
class UserState extends StoreModule {
  initState() {
    return {
      token: null,
      data: null,
      waiting: false,
      error: null,
      waitingAuth: false,
    };
  }

  /**
   * Авторизация пользователя
   * @param login {String}
   * @param password {String}
   */
  async sign({login, password}) {
    // Сброс и установка признака ожидания загрузки
    this.setState({
      ...this.initState(),
      waiting: true,
    });

    try {
      const response = await fetch(
        '/api/v1/users/sign?fields=username,email,profile(phone)', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'login': login,
            'password': password,
          }),
        },
      )


      const json = await response.json();

      if (!response.ok) {
        throw json;
      }

      // Сервер вернул успешный ответ
      this.setState(
        {
          ...this.getState(),
          data: json.result.user,
          waiting: false,
          token: json.result.token,
        },
        'Загружен user из АПИ'
      );
      localStorage.setItem('token', json.result.token);
    } catch (e) {


      this.setState({
        ...this.initState(),
        error: e?.error?.data?.issues[0]?.message || e?.error?.message || 'Ошибка авторизации',

      });
    }
  }


  /**
   * Получение профиля пользователя
   */
  async getProfile() {
    // Сброс и установка признака ожидания загрузки
    this.setState({
      ...this.initState(),
      waitingAuth: true,
    });

    const localToken = localStorage.getItem('token');
    if (!localToken) {

      this.setState({
        ...this.initState(),
      });
      return}


    try {
      const response = await fetch(
        '/api/v1/users/self?fields=username,email,profile(phone)', {
          headers: {
            'X-Token': localToken,
          },
        },
      );
      const json = await response.json();

      if (!response.ok) {
        throw json;
      }

      this.setState(
        {
          ...this.getState(),
          data: json.result,
          waitingAuth: false,
          token: localToken,
        },
        'Загружен user из АПИ'
      );

    } catch (e) {
      // Ошибка при загрузке
      localStorage.removeItem('token');

      this.setState({
        ...this.getState(),
        waitingAuth: false,
        error: e?.error?.data?.issues[0]?.message || e?.error?.message || 'Ошибка проверки авторизации',
      });
    }
  }


  /**
   * Сброс авторизации пользователя
   */
  async logout() {
    // Сброс и установка признака ожидания загрузки
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    const localToken = localStorage.getItem('token');

    if (!localToken) {

      this.setState({
        ...this.initState(),
      });

      return}

    try {
      const response = await fetch(
        '/api/v1/users/sign',
        {method: 'DELETE',
          headers: {
            'X-Token': localToken,
          },
        },
      );
      const json = await response.json();

      if (!response.ok) {
        throw json;
      }

      localStorage.removeItem('token');

      this.setState(
        {
          ...this.initState(),
        },
        'Загружен user из АПИ'
      );

    } catch (e) {
      // Ошибка при загрузке
      this.setState({
        ...this.getState(),
        waiting: false,
        error: e?.error?.data?.issues[0]?.message || e?.error?.message || 'Ошибка сброса авторизации',
      });
    }
  }

  /**
   * Сброс состояния
   */
  async clear() {
    // Сброс данных юзера
    this.setState({
      ...this.initState(),
    });}
}

export default UserState;
