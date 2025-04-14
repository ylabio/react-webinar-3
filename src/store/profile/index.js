import StoreModule from '../module';

class ProfileState extends StoreModule {
  initState() {
    return {
      user: null,
      error: '',
      loading: false,
    };
  }

  async loadCurrentUser(token) {
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
        this.setState({ user: null });
        return false;
      }

      this.setState({ ...this.getState(), user: data.result }, 'Загружен профиль пользователя');
      return true;
    } catch (e) {
      this.logout();
      return false;
    }
  }
}

export default ProfileState;
