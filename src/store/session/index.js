import { validateTokenSymbols } from "../../utils";
import StoreModule from "../module";

/**
 * Модуль сессии
 */
class SessionState extends StoreModule {

  initState() {
    return {
      user: null, // флаг сессии и данные юзера одновременно
      token: localStorage.getItem('token'),
      error: null,
      waiting: false
    };
  }

  async load() {
    this.setState({
      ...this.getState(),
      waiting: true
    }, 'Проверка авторизации пользователя...');

    if (!validateTokenSymbols(localStorage.getItem('token'))) {
      this.setToken(null);
      this.setState({
        ...this.getState(),
        error: 'Incorrect token!',
        user: null,
        waiting: false
      }, 'Некорректный токен.');
      return;
    }

    const json = await (
      await fetch('/api/v1/users/self', {
        headers: { "X-Token": localStorage.getItem('token') }
      })
    ).json();

    if (json.error) {
      if (json.error.code == 'Forbidden')
        this.setToken(null);

      this.setState({
        ...this.getState(),
        error: json.error,
        user: null,
        waiting: false
      }, 'Ошибка загрузки данных пользователя:' + json.error);
      return;
    }

    this.setToken(localStorage.getItem('token'));

    this.setState({
      ...this.getState(),
      user: json.result,
      waiting: false,
    }, 'Проверка авторизации выполнена.');
  }

  async logout() {
    await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: { "X-Token": localStorage.getItem('token') }
    });

    this.setToken(null);

    this.setState({
      ...this.getState(),
      user: null,
    }, 'Выход выполнен.');
  }

  // метод дергается из LoginState, от туда приходит токен и далее используется тут
  setToken(token) {
    if (token)
      localStorage.setItem('token', token);
    else
      localStorage.removeItem('token');

    // для модуля профиля тоже нужен токен, пока копируем из сессии 
    this.store.actions.profile.setToken(token);

    this.setState({
      ...this.getState(),
      token
    }, token ? 'Сохранение новного токена.' : 'Обнуление битого токена');
  }

  setUser(user) {
    this.setState({
      ...this.getState(),
      user
    }, 'Обновление данных юзера.');
  }

  resetError() {
    this.setState({
      ...this.getState(),
      error: null
    }, 'Сброс ошибки загрузки профиля.');
  }
}

export default SessionState;