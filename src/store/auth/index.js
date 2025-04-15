import StoreModule from '../module';

class AuthState extends StoreModule {
  initState() {
    return {
      isLoggedIn: localStorage.getItem('token') !== null,
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
      //Если все ок, запоминаем токен в localStorage
      localStorage.setItem('token', json.result.token);
      this.setState({
        ...this.getState(),
        isLoggedIn: true,
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
      }, 'Выход пользователя')
    } catch (e) {
      this.setState({
        ...this.getState(),
        error: e.message,
      }, 'Ошибка при выходе пользователя')
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

export default AuthState;
