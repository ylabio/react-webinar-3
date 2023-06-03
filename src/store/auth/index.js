import StoreModule from "../module";

class AuthState extends StoreModule {
  initState() {
    return {
      isError: false,
      isLoading: false
    }
  }

  async onLogin(data) {
    const login = data.login,
          password = data.password;

    const params = {
      method: 'POST',
      body: JSON.stringify({login, password}),
      headers: { 'Content-Type': 'application/json' }
    }

    this.setState({
      ...this.getState(),
      isLoading: true
    })

    await fetch('/api/v1/users/sign', params)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        this.setState({
          isError: data.error.data.issues[0].message,
        })

        return;
      }

      localStorage.setItem('token', data.result.token);

      this.setState({
        isError: false,
        isLoading: false
      })

      location.reload(); // костыль, не могу понять, как правильно заставить работать....
    })
    .catch(err => {
      this.setState({
        ...this.getState(),
        isLoading: false
      })

      throw new Error(err)
    })
  }

  resetError() {
    this.setState({
      ...this.getState(),
      isError: false
    })
  }
}

export default AuthState;