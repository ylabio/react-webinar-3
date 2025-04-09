import StoreModule from '../module';

/**
 * Состояние пользователя (авторизация, профиль)
 */
class UserState extends StoreModule {
  /**
   * Начальное состояние
   */
  initState() {
    return {
      data: null, // Данные авторизованного пользователя
      token: localStorage.getItem('token') || '',
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
        const error = data?.error?.message || 'Ошибка авторизации';
        this.setState({ ...this.getState(), error, waiting: false }, 'Ошибка при входе');
        return false;
      }

      const { token, user } = data.result;

      localStorage.setItem('token', token);
      this.setState({ token, data: user, error: '', waiting: false }, 'Пользователь авторизован');
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
      // очищаем токен
    }

    localStorage.removeItem('token');
    this.setState({ token: '', data: null, error: '' }, 'Выход из системы');
  }

  /**
   * Загрузка профиля пользователя по сохранённому токену
   * @returns {Promise<boolean>}
   */
  async loadProfile() {
    const token = this.getState().token;
    if (!token) return false;

    try {
      const response = await fetch('/api/v1/users/self?fields=*', {
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        },
      });

      const data = await response.json();
      console.log('Ответ от /users/self:', data);
      if (!response.ok) {
        this.logout();
        return false;
      }

      this.setState({ ...this.getState(), data: data.result }, 'Загружен профиль пользователя');
      return true;
    } catch (e) {
      this.logout();
      return false;
    }
  }
}

export default UserState;
