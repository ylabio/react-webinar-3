import StoreModule from "../module";

class Profile extends StoreModule {
  initState() {
    return {
      data: {},
      waiting: false
    };
  }
  //здесь может быть запрос по айди
  async loadUser(id) {
    this.setState({
      ...this.getState(),
      waiting: true
    })
    const token = window.localStorage.getItem('token');
    if (token) {
      const response = await fetch('/api/v1/users/self?fields=profile,email', {
        method: 'GET',
        headers: {
          'X-Token': token,
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        const { result } = await response.json();
        this.setParams({
          data: result,
          waiting: false
        });
      } else {
        window.localStorage.removeItem('token');
        this.setParams({
          ...this.initState(),
        });
      }
    }
  }

  async setParams(newParams = {}) {
    this.setState({
      ...this.getState(),
      ...newParams
    }, 'Установлены параметры профиля');
  }
}

export default Profile;
