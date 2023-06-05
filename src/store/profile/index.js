import StoreModule from "../module";

/**
 * Данные профиля
 */
class ProfileState extends StoreModule {

  initState() {
    return {
      fields: null,
      waiting: false,
      error: null,
      token: null
    };
  }

  async load() {
    this.setState({
      ...this.getState(),
      waiting: true
    }, 'Загрузка профиля...');

    const json = await (
      await fetch('/api/v1/users/self', {
        headers: { "X-Token": this.getState().token }
      })
    ).json();

    if (json.error) {
      this.setState({
        ...this.getState(),
        error: json.error,
        waiting: false
      }, 'Ошибка загрузки профиля:' + json.error);
      return;
    }

    this.setState({
      ...this.getState(),
      fields: json.result,
      waiting: false,
    }, 'Данные профиля загружены.');
  }

  resetError() {
    this.setState({
      ...this.getState(),
      error: null
    }, 'Сброс ошибки загрузки профиля.');
  }

  // копия токена из сессии
  setToken(token) {
    this.setState({
      ...this.getState(),
      token
    }, 'Обновление токена в модуле профиля.');
  }
}

export default ProfileState;