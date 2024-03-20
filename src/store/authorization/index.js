import StoreModule from "../module";

class AuthorizationState extends StoreModule {

  initState() {
    return {
      token: localStorage.getItem('token') || '',
      waiting: false,
      error: ''
    }
  }

  async sign(userData) {
    const response = await fetch('/api/v1/users/sign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    if(response.ok) {
        const json = await response.json();
        this.setState({
          token: json.result.token,
          waiting: false,
        }, 'Авторизация');
        localStorage.setItem('token', json.result.token);
    }
     else {
      const {error} = await response.json();
      this.setState({
        ...this.getState(),
        waiting: false,
        error: error?.data.issues[0].message
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
        error: '',
        waiting: false
      });
      localStorage.removeItem('token');
    } catch (e) {
      this.setState({
        ...this.getState(),
        waiting: false,
      });
    }
  }
}

export default AuthorizationState;