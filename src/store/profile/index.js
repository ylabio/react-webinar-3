import StoreModule from "../module";

class Profile extends StoreModule {

  initState() {
    return {
      user: null,
      auth: false,
      loading: true,
    }
  }


  async getUser() {
    const token = localStorage.getItem('token')
    if (token) {
      const response = await fetch('/api/v1/users/self', {
        headers: {
          "X-Token": token,
          "Content-Type": "application/json",
        }
      })
      const json = await response.json();
      if (json.result) {
        this.setState({
          ...this.getState(),
          auth: true,
          user: json.result,
          loading: false
        });
      } else {
        localStorage.removeItem('token')
        this.setState({
          ...this.getState(),
          auth: false,
          loading: false,
        });
      }
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  async logout() {
    const token = localStorage.getItem('token')
    if (token) {
      const response = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          "X-Token": token,
          "Content-Type": "application/json",
        }
      })
      const json = await response.json();
      if (json) {
        localStorage.removeItem('token')
        this.setState({
          ...this.getState(),
          auth: false,
          user: null,
        });
      }
    }
  }

}

export default Profile;
