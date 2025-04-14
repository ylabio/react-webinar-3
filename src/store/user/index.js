import StoreModule from '../module';

/**
 * Управление списком пользователей
 */
class User extends StoreModule {
  // Инициализация состояния
  initState() {
    return {
      list: [],        // Список пользователей
      loading: false,  // Флаг загрузки
      error: null,     // Ошибка при запросе
    };
  }

  // Загрузка пользователей с сервера
  async loadUsers() {
    this.setState({ loading: true, error: null }, 'Загрузка пользователей');

    try {
      const token = localStorage.getItem('react-webinar-3_auth_token');

      const response = await fetch('/api/v1/users?fields=*', {
        headers: {
          'X-Token': token,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Ошибка загрузки пользователей');
      }

      this.setState({
        list: data.result,
        loading: false,
        error: null,
      }, 'Пользователи загружены');
    } catch (error) {
      this.setState({
        loading: false,
        error: error.message,
      }, 'Ошибка загрузки пользователей');
    }
  }

  // Получение пользователя по ID
  getUserById() {}

  // Очистка списка пользователей
  clearUsers() {
    this.setState({
      list: [],
      error: null,
    }, 'Список пользователей очищен');
  }

  // Сброс ошибки
  clearError() {
    this.setState({
      ...this.getState(),
      error: null,
    }, 'Ошибка сброшена');
  }
}

export default User;