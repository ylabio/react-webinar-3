import StoreModule from '../module';

class AuthState extends StoreModule {
  initState() {
    return {
      user: null,      // Данные пользователя (name, email и т.д.)
      token: null,     // Токен из API
      issues: null,    // Ошибки авторизации
      waiting: false,  // Загрузка (спиннер)
      isAuthChecked: false,
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

      localStorage.setItem('token', json.result.token);
      this.setState({
        ...this.getState(),
        user: json.result.user,
        token: json.result.token,
        waiting: false,
      });

      return true; // Успех!
    } catch (error) {
      this.setState({
        ...this.getState(),
        issues: error.message,
        waiting: false,
      });
      return false; // Ошибка
    }
  }

  /**
   * Выход (логаут)
   */
  async signOut() {
    const token = this.getState().token;

    // Сразу сбрасываем состояние, чтобы избежать "зависания"
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      if (token) {
        await fetch('/api/v1/users/sign', {
          method: 'DELETE',
          headers: { 'X-Token': token },
        });
      }
    } catch (error) {
      console.error("Ошибка при выходе:", error);
      // Продолжаем сброс, даже если запрос не удался
    } finally {
      localStorage.removeItem('token');
      // Полный сброс состояния
      this.setState({
        ...this.initState(),
        isAuthChecked: true, // Важно: отмечаем проверку как завершённую
        waiting: false,
      });
    }
  }

  /**
   * Проверка токена (автоматический вход)
   */
  async checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.setState({ ...this.getState(), isAuthChecked: true });
      return;
    }

    try {
      const response = await fetch('/api/v1/users/self?fields=*', {
        headers: { 'X-Token': token },
      });
      const json = await response.json();

      if (json.error) throw new Error(json.error.message);

      this.setState({
        ...this.getState(),
        user: json.result,
        token: token,
        isAuthChecked: true,
      });
    } catch (error) {
      localStorage.removeItem('token');
      this.setState({ ...this.initState(), isAuthChecked: true });
    }
  }
}

export default AuthState;
