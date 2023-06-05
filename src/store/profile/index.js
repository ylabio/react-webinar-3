import StoreModule from '../module';

const AUTH_TOKEN = 'YLab-shop-token';

class ProfileState extends StoreModule {
  initState() {
    return ({
      profileData: {},
      profileWaiting: true
    })
  }

  async load(id = 'self') {
    this.setState({
      ...this.getState(),
      profileData: {},
      profileWaiting: true
    });
    try {
      const response = await fetch(`/api/v1/users/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'X-Token': localStorage.getItem(AUTH_TOKEN),
        }
      });
      const json = await response.json();
      this.setState({
        ...this.getState(),
        profileData: json.result,
        profileWaiting: false
      })
    } catch (e) {
      this.setState({
        profileData: {},
        profileWaiting: false
      });
    }
  }
}

export default ProfileState;