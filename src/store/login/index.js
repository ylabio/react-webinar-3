import StoreModule from "../module";

class Login extends StoreModule {

  initState() {
    return {
      error: false,
      loading: false,
    }
  }


  async login(login, password) {
    this.setState({
      error: false,
      loading: true,
    });
    const data = { login: login, password: password }
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const responseData = await response.json();

      if (responseData.error) {
        this.setState({
          error: responseData.error.data.issues[0].message,
          loading: false,
        });
      }

      if (!responseData.error) {
        localStorage.setItem('token', responseData.result.token)
        this.store.actions.profile.getUser()
        this.setState({
          error: false,
          loading: false,
        });
      }

      return responseData;
    } catch (error) {
      console.log(error)
    }
  }

}

export default Login;
