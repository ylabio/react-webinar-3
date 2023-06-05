import StoreModule from '../module';

/**
 *  ифнормация профиля пользователя
 */
class ProfileState extends StoreModule {
  initState() {
    return {
      profile: {},
      waiting: false, // признак ожидания загрузки
    };
  }

  /**
   * Загрузка данных профиля
   * @return {Promise<void>}
   */
  async load() {
    this.setState({
      profile: {},
      waiting: true,
    });

    try {
      const token = localStorage.getItem('USER_TOKEN');
      const response = await fetch('/api/v1/users/self', {
        headers: {
          ['X-Token']: token,
          ['Content-Type']: 'application/json',
        },
      });
      const { result } = await response.json();
      // Профиль загружен успешно
      this.setState(
        {
          profile: { ...result.profile, email: result.email },
          waiting: false,
        },
        'Профиль из АПИ'
      );
    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        data: {},
        waiting: false,
      });
    }
  }
}

export default ProfileState;
