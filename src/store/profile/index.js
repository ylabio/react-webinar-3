import StoreModule from "../module";

class ProfileState extends StoreModule {

  initState() {
    return {
      data: {},
      waiting: false
    }
  }

  async getProfile() {
    this.setState({
      ...this.getState(),
      waiting: true
    });

    const response = await fetch(`/api/v1/users/self`, {
      headers: {
        'X-Token': this.store.getState().auth.token
      }
    });
    const json = await response.json();

    this.setState({
      data: json.result,
      waiting: false
    }, 'Загружен пользователь из АПИ');
  }
}

export default ProfileState;