import StoreModule from '../module';

class AuthState extends StoreModule {
  initState() {
    return {
      user: null,      // Данные пользователя (name, email и т.д.)
      token: null,     // Токен из API
      issues: null,    // Ошибки авторизации
      waiting: false,  // Загрузка (спиннер)
    };
  }

  /**
   * Авторизация (логин)
   */
  async signIn(login, password) {
    this.setState({ ...this.getState(), waiting: true, issues: null });

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });
      const json = await response.json();

      if (json.error) {
        throw new Error(json.error.message);
      }

      // Сохраняем токен и данные пользователя
      localStorage.setItem('token', json.result.token); // Для автоматического входа
      this.setState({
        ...this.getState(),
        user: json.result.user,
        token: json.result.token,
        waiting: false,
      });

    } catch (error) {
      this.setState({
        ...this.getState(),
        issues: error.message,
        waiting: false,
      });
    }
  }

  /**
   * Выход (логаут)
   */
  async signOut() {
    const token = this.getState().token;
    if (!token) return;

    try {
      await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: { 'X-Token': token },
      });
    } finally {
      localStorage.removeItem('token');
      this.setState(this.initState()); // Сброс состояния
    }
  }

  /**
   * Проверка токена (автоматический вход)
   */
  async checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('/api/v1/users/self?fields=*', {
        headers: { 'X-Token': token },
      });
      const json = await response.json();

      if (json.error) {
        throw new Error(json.error.message);
      }

      this.setState({
        ...this.getState(),
        user: json.result,
        token: token,
      });

    } catch (error) {
      localStorage.removeItem('token');
    }
  }
}

export default AuthState;
