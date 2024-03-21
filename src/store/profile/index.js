import StoreModule from "../module";

class ProfileState extends StoreModule {

  initState() {
    return {
      data: {},
      waiting: false
    }
  }

  async setUser() {
    this.setState({
      ...this.getState(),
      waiting: true
    }, 'Загрузка пользователя');
    const response = await fetch('/api/v1/users/self', {
      headers: {
        'Content-Type': 'application/json',
        'X-Token': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    this.setState({
      ...this.getState(),
      data: json.result,
      waiting: false
    }, "Окончание загрузки пользователя");
  }

  clearData(){
    this.setState({
      data: {},
      waiting: false
    });
  }
}

export default ProfileState;