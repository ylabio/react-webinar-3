import StoreModule from "../module";

class UserState extends StoreModule {

  initState() {
    return {
      user: null,
      waiting: false,
      error: ''
    }
  }
  async getUserInfo(token) {
    try {
      const response = await fetch('/api/v1/users/self?fields=*', {
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      this.setState({
        ...this.getState(),
        user: data.result,
        error: '',
        waiting: false,
      });
    } catch (error) {
      this.setState({
        ...this.getState(),
        error: error.message,
        waiting: false
      });
    }
  }
}

export default UserState;