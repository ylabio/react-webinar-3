import StoreModule from '../module';

class UserState extends StoreModule {
  initState() {
    return {
      isLoggedIn: false,
      userData: null,
      error: '',
    };
  }

  /**
   * Вход пользователя на сайт
   * @param [user] { login, password }
   */

  async logInUser(user) {
    try {
      const response = await fetch('/api/v1/users/sign', {
      method: 'POST',
      headers: {'Content-type': 'application/json' },
      body: JSON.stringify(user),
      });
      const json = await response.json();
      if (!response.ok) {
        const errorMessage = json.error.data.issues[0].message;
        throw new Error(errorMessage);
      }
      const userData = {
        email: json.result.user.email,
        name: json.result.user.profile.name,
        phone: json.result.user.profile.phone,
      };
      //Если все ок, запоминаем токен в localStorage
      localStorage.setItem('token', json.result.token);
      this.setState({
        ...this.getState(),
        isLoggedIn: true,
        userData: userData,
        error: '',
      }, 'Вход пользователя');
    } catch (e) {
      this.setState({
        ...this.getState(),
        error: e.message,
      }, 'Ошибка при входе пользователя')
    }  
  }

  /**
   * Выход пользователя
   */

  async logOutUser() {
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'X-Token': localStorage.getItem('token'),
          'Content-Type': 'application/json' } 
        });
      if (!response.ok) {
        const json = await response.json();
        const errorMessage = json.error.data.issues[0].message;
        throw new Error(errorMessage);
      }
      // Если все ок, удаляем токен из localStorage
      localStorage.removeItem('token');
      this.setState({
        ...this.getState(),
        isLoggedIn: false,
        userData: null,
      }, 'Выход пользователя')
    } catch (e) {
      this.setState({
        ...this.getState(),
        error: e.message,
      }, 'Ошибка при выходе пользователя')
    }
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
          isLoggedIn: true,
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
