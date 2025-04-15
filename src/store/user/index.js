import StoreModule from '../module';

class UserState extends StoreModule {
  initState() {
    return {
      userData: null,
      waiting: true,
    };
  }


  /**
   * Получение данных пользователя через АПИ, если пользователь не вышел из учетной записи
   */

  async getUserData() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch('/api/v1/users/self?fields=*', {
          method: 'GET',
          headers: {
            'X-Token': token,
            'Content-Type': 'application/json'
          } 
        });
        const json = await response.json();
        const userData = {
          email: json.result.email,
          name: json.result.profile.name,
          phone: json.result.profile.phone,
        };
        this.setState({
          ...this.getState(),
          userData: userData,
          waiting: false,
        }, 'Загружены данные пользователя');
      } catch(e) {
        console.error(e);
      }
    }
  }

  /**
   * Очистка ошибок
   */
  clearError() {
    this.setState({
      ...this.getState(),
      error: '',
    })
  };


}

export default UserState;
