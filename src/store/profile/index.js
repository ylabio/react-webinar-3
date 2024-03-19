import StoreModule from '../module';

class ProfileStore extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */

  initState() {
    return {
      userData: {},
      waiting: false
    }
  }

  async getUserData() {
    this.setState({
      ...this.getState(),
      waiting: true
    });

    const response = await fetch('/api/v1/users/self', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'X-Token': this.store.getState().authorization.token
      }
    });

    const json = await response.json();

    this.setState({
      ...this.getState(),
      userData: json.result,
      waiting: false
    });
  }
}

export default ProfileStore;