import StoreModule from '../module';

/**
 * Информация о аутентификации
 */
class LoginState extends StoreModule {

  initState() {
    return {
      errorMessage: ''
    };
  }

  /**
   * Получение данных пользователя
   * @param authUrlProperties {String}
   * @param body {Object}
   * @param headers {Object}
   * @param params
   * @return {Object}
   */
  async load(authUrlProperties, {body, headers, ...params}) {

      const response = await fetch(`/api/v1/users/${authUrlProperties}`, {
        headers: new Headers({ 'content-type': 'application/json', ...headers }),
        body: JSON.stringify(body),
        ...params
      });
      const json = await response.json();
      if (json.error?.data.issues[0].message) {
        this.setError(json.error?.data.issues[0].message);
      }
      return json;
  }

  /**
   * Занесение сообщения полученной ошибки в state
   * @param e {String}
   */
  setError (e) {
    this.setState(
      {
        ...this.getState(),
        errorMessage: e
      },
      'Получена ошибка'
    );
  }

  /**
   * Занесение данных пользователя в стейт и установка token
   * @param token {String}
   * @param user {Object}
   */
  setUser ({token, user}) {
    window.localStorage.setItem("token", token);
    location.reload();
  }

  /**
   * Вход в аккаунт
   * @param data {Object}
   * @return {Promise<void>}
   */
  async signIn (data) {
    if (!data.login.length || !data.password.length) {
      return this.setError('login.error.emptyFields');
    }
    const response = await this.load('sign', {
      body: data,
      method: 'POST'
    });
    if (response.result?.token) {
      const {token, user} = response.result;
      this.setUser({token, user});
    }
  }

  /**
   * Выход из аккаунта
   * @return {Promise<void>}
   */
  async signOut() {
    const token = localStorage.getItem('token')
    await this.load("sign", {method: 'DELETE', headers: {'X-Token': token}});
    window.localStorage.removeItem("token");
    location.reload();
  }
}

export default LoginState;