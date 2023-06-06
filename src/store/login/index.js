import StoreModule from "../module";

class LoginState extends StoreModule {

  initState() {
    return {
      login: '',
      password: '',
      error: '',
    };
  }

  setLogin(login) {
    this.setState({
      ...this.getState(),
      login: login
    });
  }

  setPassword(password) {
    this.setState({
      ...this.getState(),
      password: password
    });
  }

  setError(error) {
    this.setState({
      ...this.getState(),
      error
    });
  }

  clearForm() {
    this.setState({
      ...this.getState(),
      login: '',
      password: '',
      error:''
    });
  }
  async login(e) {
    e.preventDefault();
    const url = `/api/v1/users/sign`;
    const data = {
      login: this.getState().login,
      password: this.getState().password
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const responseData = await response.json();
        const error = responseData.error.data?.issues[0];
        this.setError(error.message)
      }

      const responseData = await response.json();
      if (responseData.result.token) {
        localStorage.setItem('token', responseData.result.token);
        this.store.actions.user.setAuthorized(true);
      }
    } catch (error) {
      console.log(error)
    }
  }

  async logout() {
    await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: { "X-Token": localStorage.getItem('token') }
    });
    localStorage.removeItem('token');
    this.store.actions.user.setAuthorized(false);
    this.store.actions.profile.deleteProfile()
  }
}

export default LoginState;