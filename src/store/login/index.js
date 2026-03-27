import StoreModule from '../module';

/**
 * Страница авторизации
 */
class LoginState extends StoreModule {
  initState() {
    return {
      user: null,
      token: localStorage.getItem('token') || sessionStorage.getItem('token') || '',
      issues: null
    };
  }

  /**
   * Вход пользователя
   * @param credentials Реквезиты для входа
   */
  async login(credentials) {
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          login: credentials.login,
          password: credentials.password
        })
      });
      
      const data = await response.json();
      
      if (!response.ok || !data.result?.token) {
        throw new Error('Неверный логин или пароль');
      }
      
      localStorage.setItem('token', data.result.token);
      
      this.setState({
        ...this.state,
        token: data.result.token,
        user: data.result.user,
        issues: null
      });
      
      return true;
    } catch (e) {
      this.setState({...this.state, issues: e.message});
      return false;
    }
  }

  async autoLogin() {
    // Получаем токен из localStorage
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    if (!token) return;
  
    try {
      // Запрашиваем данные пользователя с токеном
      const response = await fetch('/api/v1/users/self?fields=*', {
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const userData = await response.json();
      
      // Обновляем состояние
      this.setState({
        ...this.state,
        user: userData.result, // Предполагаем, что данные в поле result
        token: token,
        issues: null
      });
  
    } catch (e) {
      console.error('Ошибка автоматической авторизации:', e);
      this.logout();
    }
  }

  async fetchUserData() {
    try {
      const token = this.state.token;
      if (!token) throw new Error('Токен отсутствует');

      const response = await fetch('/api/v1/users/self?fields=*', {
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const userData = await response.json();
      
      this.setState({
        ...this.state,
        user: userData
      });

      return userData;

    } catch (e) {
      console.error('Ошибка загрузки профиля:', e);
      this.logout();
      throw e;
    }
  }

  logout() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    
    this.setState({
      ...this.state,
      user: null,
      token: '',
      issues: null
    }, 'Выход из системы');
  }
}

export default LoginState;
