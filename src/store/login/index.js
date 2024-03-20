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
        "Content-Type": "application/json"
      },
      body: JSON.stringify({...formData, remember: true}),
    }

    this.setState({
      userData: {},
      waiting: true
    });

    try {
      const response = await fetch('/api/v1/users/sign', options);
      const json = await response.json();

      if (json.error) {
        throw new Error(json.error.message);
      }

      this.setState({
        ...this.getState(),
        userData: json.result.user,
        waiting: false,
        error: null,
      });
    }
    catch (error) {
      this.setState({
        ...this.getState(),
        userData: {},
        waiting: false,
        error: error,
      });
    }
  }
}

export default LoginState;