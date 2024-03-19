import StoreModule from "../module";

/**
 * Информация о сессии пользователя
 */
class AuthState extends StoreModule {

  initState() {
    return {
      auth: !!localStorage.getItem('token'),
      user: localStorage.getItem('name'),
      authError: null
    }
  }

  logIn = async (login, password) => {
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "login": login,
          "password": password
        })
      })
  
      const data = (await response.json()).result;
  
      localStorage.setItem('token', data.token);
      localStorage.setItem('name', data.user.profile.name);
  
      this.setState({
        auth: true,
        user: data.user.profile.name
      }, 'Установка признака авторизации');
    } catch (error) {
      this.setState({
        authError: error
      }, 'Ошибка авторизации');
    }
  }

  
  logOut = async () => {
    try {
      await fetch('/api/v1/users/sign', {
        method: "DELETE",
        headers: {
          "X-Token": localStorage.getItem('token'),
          "Content-Type": "application/json"
        }
      })
  
      localStorage.clear();
      
      this.setState({
        auth: false,
        user: {}
      }, 'Удаление признака авторизации');
    } catch (error) {
      this.setState({
        authError: error
      }, 'Ошибка авторизации');
    }
  }
}

export default AuthState;
