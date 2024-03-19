import StoreModule from "../module";

class ProfileState extends StoreModule {

  initState() {
    return {
      user: {},
      waiting: false,
      errorMessage: ''
    }
  }

  async getUser(token) {
    this.setState({
        ...this.getState(),
        waiting: true,
      });

    try {
      const response = await fetch('/api/v1/users/self?fields=email,profile',
      {
        method: 'GET',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });
      
      const json = await response.json();

      if (json.error) {
        this.setState({
          ...this.getState(),
          errorMessage: json.error.data.issues[0].message,
          waiting: false
        });
      } else {
        this.setState({
          ...this.getState(),
          user: {
              name: json.result.profile.name,
              phone: json.result.profile.phone,
              email: json.result.email,
          },
          waiting: false,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export default ProfileState;
