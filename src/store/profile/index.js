import StoreModule from "../module";

/**
 * Данные профиля
 */
class ProfileState extends StoreModule {
  initState() {
    return {
      data: {},
      waiting: false // признак ожидания загрузки
    }
  }

  /**
   * @return {Promise<void>}
   */
  async load () {
    this.setState({
      data: {},
      otherData: {},
      waiting: true
    });

    try {
      const response = await fetch('/api/v1/users/self', {
        headers: { "X-Token": localStorage.getItem('token') }
      });

      if (response.ok) {
        const json = await response.json();
        // Пользователь загружен успешно
        this.setState({
          data: json.result,
          waiting: false
        },'Загружен профиль пользователя из API');
      }
    } catch (e) {
      // Ошибка при загрузке
      console.log(e.message)
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        data: {},
        waiting: false
      });
    }
  }

  deleteProfile(){
    this.setState({
      ...this.getState(),
      data: {},
    }, 'Пользователя не существует.');
  }

}

export default ProfileState;