import StoreModule from '../module';

class UserState extends StoreModule {
  initState() {
    return {
      user: null,
      waiting: false,
      error: null,
    };
  }

  async fetchUserProfile() {
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error('Пользователь не авторизован');
      return;
    }

    this.setState(
      {
        ...this.getState(),
        waiting: true,
      },
      'Загрузка профиля',
    );

    try {
      const response = await fetch('api/v1/users/self?fields=*', {
        method: 'GET',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 401) {
          localStorage.removeItem('authToken');
          this.setState(
            {
              ...this.initState(),
            },
            'Токен недействителен',
          );
          throw new Error('Токен недействителен');
        }

        throw new Error(errorData.message || 'Ошибка загрузки профиля');
      }

      const data = await response.json();

      this.setState(
        {
          ...this.getState(),
          user: data.result,
          waiting: false,
          error: null,
        },
        'Профиль загружен',
      );
    } catch (error) {
      this.setState(
        {
          ...this.getState(),
          waiting: false,
          error: error.message,
        },
        'Ошибка загрузки профиля',
      );
    }
  }
}

export default UserState;
