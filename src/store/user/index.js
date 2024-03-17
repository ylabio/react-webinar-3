import StoreModule from "../module";

class UserState extends StoreModule {

  initState() {
    return {
      user: null,
      token: localStorage.getItem('token') || '',
      waiting: false,
      error: ''
    }
  }

  async sign(userData) {
    console.log(this.getState.token)
    try {
      this.setState({
        waiting: true,
        error: ''
      });

      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const json = await response.json();

      this.setState({
        ...this.getState(),
        user: json.result.user,
        token: json.result.token,
        waiting: false,
        error: '',
      }, 'Авторизация');
      localStorage.setItem('token', json.result.token);
    } catch (e) {
      this.setState({
        waiting: false,
        error: e.message,
      });
    }
  }

  async logout() {
    try {
      this.setState({
        ...this.getState(),
        waiting: true,
        error: ''
      });

      await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'X-Token': this.getState().token,
          'Content-Type': 'application/json'
        }
      });
      this.setState({
        token: '',
        user: null,
        error: '',
        waiting: false
      });
      localStorage.removeItem('token');
    } catch (e) {
      this.setState({
        waiting: false,
      });
    }
  }

  async getUserInfo() {
    try {
      const token = this.getState().token;
      if (!token) {
        return;
      }
      const response = await fetch('/api/v1/users/self?fields=*', {
        method: 'GET',
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
        error: error.message,
        waiting: false
      });
    }
  }
}

export default UserState;