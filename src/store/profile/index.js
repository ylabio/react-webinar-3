import StoreModule from '../module';

/**
 * Профиль пользователя
 */

class ProfileState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      // authLogin: false,
      profile: {},
      waiting: false,
    }
  }

  /**
   *Отправка данных на сервер для получения данных пользователя
   */
   async getDataUser () {

    const token = localStorage.getItem('X-Token');

    this.setState({
      ...this.getState(),
      waiting: true
    }, 'Получен токен пользователя');

    if (token) {
      const response = await fetch('/api/v1/users/self?fields=*', {
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token
        },
      });
      
      const json = await response.json();
  
      this.setState({
        ...this.getState(),
        profile: {
          name: json.result.profile.name,
          phone: json.result.profile.phone,
          email: json.result.email
        },
        waiting: false
      }, 'Загружены данные пользователя из АПИ');
    }  
  }

}

export default ProfileState;