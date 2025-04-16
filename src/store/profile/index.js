import StoreModule from '../module';

class ProfileState extends StoreModule {
  initState() {
    return {
      user: null,
      error: null,
      waiting: false,
    };
  }

  async loadProfile(token) {
    if (!token) return false;

    try {
      const response = await fetch('/api/v1/users/self?fields=*', {
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error('Пользователь не найден');
      }

      this.setState(
        {
          ...this.getState(),
          user: json.result,
        },
        'Загрузка профиля',
      );

      return true;
    } catch (error) {
      console.log(error);
      this.store.actions.auth.signOut();
      return false;
    }
  }
}

export default ProfileState;
