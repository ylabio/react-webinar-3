import StoreModule from "../module";

/**
 * Данные юзера
 */
class UserState extends StoreModule {

  initState() {
    return {
      misc: {}, // заглушка для всякой статистической ерунды (клики, просмотры, лайки)
      fields: null, // поля юзера от апи
      token: localStorage.getItem('token'),
      error: null,
      waiting: false
    };
  }

  setUserData(fields, token) {
    //console.log('setUserData: fields:', fields);
    localStorage.setItem('token', token);
    this.setState({
      ...this.getState(),
      fields,
      token
    }, 'Поля и токен пользователя установлены.');
  }

  setMiscData(misc) {
    this.setState({
      ...this.getState(),
      misc,
    }, 'Прочие данные пользователя обновлены.');
  }

  async load() {
    this.setState({
      ...this.getState(),
      waiting: true
    }, 'Загрузка данных пользователя...');

    //GET {{baseUrl}}/users/self
    const json = await (
      await fetch('/api/v1/users/self', { // todo: вынести все запросы или baseUrl в const
        headers: { "X-Token": localStorage.getItem('token') }
      })
    ).json();
    //console.log('load: json:', json);

    if (json.error) {
      this.setState({
        ...this.getState(),
        error: json.error,
        waiting: false
      }, 'Ошибка Загрузки данных пользователя:' + json.error);
      return;
    }

    this.setState({
      ...this.getState(),
      waiting: false,
      fields: json.result
    }, 'Данные пользователя загружены.');
  }

  async logout() {
    // DELETE {{baseUrl}}/users/sign
    await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: { "X-Token": localStorage.getItem('token') }
    });

    localStorage.removeItem('token');

    this.setState({
      ...this.getState(),
      fields: null,
      token: null
    }, 'Выход выполнен.');
  }

  resetError() {
    this.setState({
      ...this.getState(),
      error: null
    }, 'Сброс ошибки загрузки.');
  }
}

export default UserState;