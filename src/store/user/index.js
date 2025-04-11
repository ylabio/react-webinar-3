import StoreModule from '../module';

/**
 * Состояние пользователя
 */
class UserState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      data: null,
      isLoading: true,
      error: null,
    };
  }

  /**
   * Загрузка пользователя по id. Если id не указан, загружаем текущего пользователя
   * @return {Promise<void>}
   */
  async getUserById(id = 'self', fields = '*') {
    try {
      const token = localStorage.getItem('authToken');

      const response = await fetch(`/api/v1/users/${id}?fields=${fields}`, {
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Ошибка загрузки профиля');
      }

      const json = await response.json();
      const user = json.result;

      // Устанавливаем профиль пользователя
      this.setState(
        {
          data: user,
          error: null,
          isLoading: false,
        },
        'Профиль загружен',
      );
    } catch (error) {
      this.setState(
        {
          user: null,
          error: error.message,
          isLoading: false,
        },
        'Ошибка загрузки профиля',
      );
    }
  }
}

export default UserState;
