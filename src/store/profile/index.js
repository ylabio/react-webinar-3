import StoreModule from "../module";

class Profile extends StoreModule {
  initState() {
    return {
      waiting: false,
      userInfo: {
        profile: {}
      },
    }
  }

  async getUserInfo() {
    this.setState({...this.getState(), waiting: true})
    const response = await fetch(`/api/v1/users/self?fields=*`, {
      method: "GET",
      headers: {
        "X-Token": localStorage.getItem('token'),
        "Content-Type": "application/json",
      }
    })
    const json = await response.json();
    if (!json.error) {
      this.setState({
        ...this.getState(),
        userInfo: json.result,
        waiting: false,
      }, 'Успешно полученны данные профиля');
    } 
    this.setState({
      ...this.getState(),
      userInfo: {},
      waiting: false,
    }, 'Ошибка авторизации');
  }
}

export default Profile;
