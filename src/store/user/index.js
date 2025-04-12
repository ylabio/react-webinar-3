import StoreModule from '../module';

/**
 * Состояние пользователя (авторизация)
 */
class UserState extends StoreModule {
  /**
   * Начальное состояние
   */
  initState() {
    return {
      token: localStorage.getItem('token') ?? null,
      error: '',
      waiting: false,
    };
  }

  /**
   * Авторизация по логину и паролю
   * @param login {string}
   * @param password {string}
   * @returns {Promise<boolean>}
   */
  async login(login, password) {
    this.setState({ ...this.getState(), waiting: true, error: '' }, 'Попытка авторизации');

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        const error = data?.error || { message: 'Ошибка авторизации' };
        this.setState({ ...this.getState(), error, waiting: false }, 'Ошибка при входе');
        return false;
      }

      const { token } = data.result;

      localStorage.setItem('token', token);
      this.setState({ token, error: '', waiting: false }, 'Пользователь авторизован');
      return true;
    } catch (e) {
      this.setState({ ...this.getState(), error: 'Сетевая ошибка', waiting: false }, 'Ошибка сети');
      return false;
    }
  }

  /**
   * Выход из системы
   * @returns {Promise<void>}
   */
  async logout() {
    const token = this.getState().token;

    try {
      await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        },
      });
    } catch (e) {
      // игнорируем
    }

    localStorage.removeItem('token');
    this.setState({ token: null, error: '', waiting: false }, 'Выход из системы');
    this.store.actions.profile.clear();
  }
}

export default UserState;
