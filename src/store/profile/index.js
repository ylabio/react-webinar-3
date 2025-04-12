import StoreModule from '../module';

class ProfileState extends StoreModule {
  initState() {
    return {
      data: null,
      waiting: false,
      error: '',
    };
  }

  async load() {
    this.setState({ ...this.getState(), waiting: true }, 'Загрузка профиля');

    try {
      const token = this.store.getState().user.token;
      const response = await fetch('/api/v1/users/self?fields=*', {
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        this.setState({ data: null, waiting: false, error: 'Ошибка загрузки' }, 'Ошибка профиля');
        return;
      }

      this.setState({ data: json.result, waiting: false, error: '' }, 'Профиль загружен');
    } catch (e) {
      this.setState({ data: null, waiting: false, error: 'Сетевая ошибка' }, 'Ошибка сети');
    }
  }

  clear() {
    this.setState({ data: null, waiting: false, error: '' }, 'Профиль очищен');
  }
}

export default ProfileState;
