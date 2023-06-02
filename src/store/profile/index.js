import StoreModule from "../module";

/**
 * Данные профиля
 */
class ProfileState extends StoreModule {

  initState() {
    return {
      misc: {}, // заглушка для всякой статистической ерунды (клики, просмотры, лайки)
      fields: null, // поля юзера от апи
    };
  }

  setUserData(fields) {
    console.log('fields', fields);
    this.setState({
      ...this.getState(),
      fields
    }, 'Поля пользователя установлены.');
  }

  setMiscData(misc) {
    this.setState({
      ...this.getState(),
      misc,
    }, 'Прочие данные пользователя обновлены.');
  }

}

export default ProfileState;