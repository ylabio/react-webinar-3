import StoreModule from '../module';

class LoginState extends StoreModule {

  initState() {
    return {
      userData: {},
      waiting: false
    }
  }

  async login(formData) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...formData, remember: true}),
    }

    this.setState({
      ...this.getState(),
      userData: {},
      waiting: true
    });

    try {
      const response = await fetch('/api/v1/users/sign', options);
      const json = await response.json();

      if (json.error) {
        throw new Error(json.error.data.issues[0].message);
      }

      this.setState({
        userData: json.result.user,
        waiting: false,
        error: null,
      });
      localStorage.setItem('X-Token', json.result.token);
    } catch (error) {

      this.setState({
        ...this.getState(),
        userData: {},
        waiting: false,
        error: error,
      });
    }
  }

  async getProfile() {
    const token = localStorage.getItem('X-Token');
    if (token) {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        }
      }
      try {
        const response = await fetch('/api/v1/users/self?fields=*', options);
        const json = await response.json();

        this.setState({
          ...this.getState(),
          userData: json.result,
          waiting: false,
          error: null,
        })
      } catch (error) {
        this.setState({
          ...this.getState(),
          userData: {},
          waiting: false,
          error: error,
        })
      }
    }
  }

  async logout() {
    this.setState({
      ...this.getState(),
      waiting: true
    });
    const token = localStorage.getItem('X-Token');
    if (token) {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        }
      }
      try {
        const response = await fetch('/api/v1/users/sign', options);
        const json = await response.json();

        this.setState({
          ...this.getState(),
          userData: {},
          waiting: false,
          error: null,
        });

        localStorage.removeItem('X-Token');
      } catch (error) {
        this.setState({
          ...this.getState(),
          userData: {},
          waiting: false,
          error: error,
        })
      }
    }
  }
}

export default LoginState;