import StoreModule from '../module';

class ProfileState extends StoreModule {
  initState() {
    return {
        data: null, // Данные профиля
        waiting: false, // Флаг загрузки
        error: null, // Ошибки
    };
  }

  // Загрузка данных профиля
  async load() {
    try {
      this.setState({...this.getState(), waiting: true});
      
      const response = await fetch('/api/v1/users/self?fields=*', {
        headers: {
          'X-Token': this.store.getState().user.token,
          'Content-Type': 'application/json'
        }
      });
      
      const json = await response.json();
      this.setState({data: json.result, waiting: false});
    } catch(e) {
      this.setState({error: e.message, waiting: false});
    }
  }
}

export default ProfileState;