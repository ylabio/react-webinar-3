import StoreModule from "../module";

class ProfileState extends StoreModule {
  initState() {
    return {
      userData: {},
      pending: false
    };
  }

  async getUserData() {
    try {
      const { token } = this.store.getState().auth;

      this.setState({
        userData: {},
        pending: true
      });

      const res = await fetch('/api/v1/users/self', {
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token
        }
      });

      const { result } = await res.json();
      this.setState({ userData: result, pending: false });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
}

export default ProfileState;
