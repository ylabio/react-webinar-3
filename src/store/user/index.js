import StoreModule from "../module";


class UserState extends StoreModule {

  initState() {
    return {
      user: {},
      waiting: false,
    };
  }

  async fetchUser(token) {
    if (token === '') return

    try {
      this.setState({...this.getState(), waiting: true});
      const response = await fetch('/api/v1/users/self?fields=*', {
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log('fetchUser', data)
      this.setState({...this.getState(), user: {...data.result}, waiting: false});
    } catch (error) {
      this.setState({waiting: false, error: error.message});
    }
  }

}

export default UserState;
