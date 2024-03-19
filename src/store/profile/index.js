import StoreModule from "../module";

/**
 * Детальная информация о профиле
 */
class ProfileState extends StoreModule {

  initState() {
    return {
      data: {},
      waiting: false,  // признак ожидания загрузки
      error: null
    }
  }

  /**
   * Загрузка информации профиля по token
   * @param token {String}
   * @return {Promise<void>}
   */
  async load(token) {
    this.setState({
      data: {},
      waiting: true
    });

    try {
      const response = await fetch(`/api/v1/users/self?fields=*`, {
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        }
      });

      if(!response.ok) {
        this.setState({
          ...ths.initState(),
          error: response.statusText
        })
      }

      const json = await response.json();

      // Профиль загружен успешно
      this.setState({
        data: json.result,
        waiting: false,
      }, 'Загружен профиль из АПИ');
    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.store.actions.login.validateToken(token)
    }
  }
}

export default ProfileState;
