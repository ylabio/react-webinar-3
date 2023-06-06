import { validateTokenSymbols } from "../../utils";
import StoreModule from "../module";

/**
 * Модуль сессии.
 */
class SessionState extends StoreModule {

  initState() {
    return {
      status: 'none', // none | loading | success | failed | terminated - ситуаций много, нужно спец поле с текущим статусом
      user: null, // флаг сессии и данные юзера одновременно
      token: localStorage.getItem('token'),
      error: null,
      waiting: false
    };
  }

  async load() {
    this.setState({
      ...this.getState(),
      status: 'loading',
      waiting: true
    }, 'Проверка авторизации пользователя...');

    if (!validateTokenSymbols(localStorage.getItem('token'))) {
      this.setToken(null);
      this.setState({
        ...this.getState(),
        status: 'failed',
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
        status: 'failed',
        error: json.error,
        user: null,
        waiting: false
      }, 'Ошибка загрузки данных пользователя:' + json.error);
      return;
    }

    this.setToken(localStorage.getItem('token'));

    this.setState({
      ...this.getState(),
      status: 'success',
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
      status: 'terminated',
      user: null,
    }, 'Выход выполнен.');
  }

  // метод так же дергается из LoginState, валидный токен приходит от туда.
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
      status: user ? 'success' : 'failed', // если передали поля, то считаем что сессия есть
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