import StoreModule from "../module";
import { validateTokenSymbols } from "../../utils";

/**
 * Данные юзера
 */
class UserState extends StoreModule {

  initState() {
    return {
      token: localStorage.getItem('token'),
      error: null,
      waiting: false
    };
  }

  async load() {
    this.setState({
      ...this.getState(),
      waiting: true
    }, 'Загрузка данных пользователя...');

    if (!validateTokenSymbols(localStorage.getItem('token'))) {
      localStorage.removeItem('token');
      this.setState({
        ...this.getState(),
        error: 'Incorrect token!',
        token: null,
        waiting: false
      }, 'Некорректный токен.');
      return;
    }

    //GET {{baseUrl}}/users/self
    const json = await (
      await fetch('/api/v1/users/self', { // todo: вынести все запросы или baseUrl в const
        headers: { "X-Token": localStorage.getItem('token') }
      })
    ).json();
    //console.log('load: json:', json);

    if (json.error) {
      if (json.error.code == 'Forbidden') {
        localStorage.removeItem('token');
        console.error('Обнуление битого токена');
      }
      this.setState({
        ...this.getState(),
        error: json.error,
        token: localStorage.getItem('token'),
        waiting: false
      }, 'Ошибка Загрузки данных пользователя:' + json.error);
      return;
    }

    this.store.actions.profile.setUserData(json.result);

    this.setState({
      ...this.getState(),
      waiting: false,
    }, 'Данные пользователя загружены.');
  }

  async logout() {
    // DELETE {{baseUrl}}/users/sign
    await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: { "X-Token": localStorage.getItem('token') }
    });

    localStorage.removeItem('token');

    this.store.actions.profile.setUserData(null);

    this.setState({
      ...this.getState(),
      token: null
    }, 'Выход выполнен.');
  }

  setToken(token) {
    localStorage.setItem('token', token);
    this.setState({
      ...this.getState(),
      token
    }, 'Сохранение новного токена.');
  }

  resetError() {
    this.setState({
      ...this.getState(),
      error: null
    }, 'Сброс ошибки загрузки профиля.');
  }
}

export default UserState;