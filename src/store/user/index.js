import StoreModule from "../module";

class UserState extends StoreModule {
  initState() {
    return {
      token: localStorage.getItem('token') || null,
      profile: null,
      loginError: null
    };
  }

  async login(login, password) {
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password })
      });

      const data = await response.json();

      if (data.error) {
        this.setState({
          ...this.getState(),
          loginError: data.error.message || 'Login failed',
          token: null,
          profile: null
        });
        return false;
      }

      localStorage.setItem('token', data.result.token);
      this.setState({
        ...this.getState(),
        token: data.result.token,
        profile: data.result.user,
        loginError: null
      });

      return true;
    } catch (e) {
      this.setState({
        ...this.getState(),
        loginError: 'Network error',
        token: null,
        profile: null
      });
      return false;
    }
  }

  async loadProfile() {
    if (!this.getState().token) return;
    
    try {
      const response = await fetch('/api/v1/users/self?fields=*', {
        method: 'GET',
        headers: {
          'X-Token': this.getState().token,
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      
      if (data.error) {
        this.logout();
        return;
      }

      this.setState({
        ...this.getState(),
        profile: data.result
      });
    } catch (e) {
      this.logout();
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.setState({
      ...this.initState()
    });
  }
}

export default UserState;
