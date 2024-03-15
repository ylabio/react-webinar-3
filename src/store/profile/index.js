import StoreModule from "../module";

class ProfileState extends StoreModule {

  initState() {
    return {
      data: {},
      waiting: false
    }
  }

  async getProfile() {
    const token = await this.store.getState().authorization.token;
    this.setState({
      data: {},
      waiting: true
    });
    const res = await fetch('/api/v1/users/self', {
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token
      },
    });
    const json = await res.json();
    this.setState({
      data: json.result,
      waiting: false
    });

  }
}

export default ProfileState;