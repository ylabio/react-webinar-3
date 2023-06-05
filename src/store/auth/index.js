import StoreModule from "../module";

class AuthState extends StoreModule {

  initState() {
    return {
      loginValue: "",
      passwordValue: "",
      isLoggedIn: false,
      serverError: "",
      waiting: false 
    }
  }

  setLoginValue(newLogin) {
    this.setState({
        ...this.getState(),
        loginValue: newLogin
    });
  }

  setPasswordValue(newPassword) {
    this.setState({
        ...this.getState(),
        passwordValue: newPassword
    });
  }

  setLoggedIn(boolValue) {
    this.setState({
        ...this.getState(),
        isLoggedIn: boolValue
    });
  }

  authChecking() {
    const isInStorage = Boolean(localStorage.getItem("token"))

    this.setState({
      ...this.getState(),
      isLoggedIn: isInStorage,
      profileInfo: {
        ...this.getState().profileInfo,
        name: localStorage.getItem("name")
      }
    });

    return isInStorage

  }


  async SignIn(login, password) {

    this.setState({
      ...this.getState(),
      serverError: "",
      waiting: true
    });

    try {
      const response = await fetch(`/api/v1//users/sign`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({login, password})
      });
      const json = await response.json();

      if (json.error) {
        console.log(json)
        throw new Error(json.error.data.issues[0].message)
      } else {
        localStorage.setItem("token", json.result.token)
        localStorage.setItem("name", json.result.user.profile.name)
      }

      this.setState({
        ...this.getState(),
        loginValue: "",
        passwordValue: "",
        isLoggedIn: true,
        waiting: false
      });

      return true

    } catch (e) {

      this.setState({
        ...this.getState(),
        isLoggedIn: false,
        serverError: e.message,
        waiting: false
      });

      return false
    }
  }

  async SignOut() {

    this.setState({
      ...this.getState(),
      waiting: true
    });

    const token = localStorage.getItem("token")

    try {
      const response = await fetch(`/api/v1//users/sign`, {
        method: "DELETE",
        headers: {
          "X-Token": token,
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();

      if (json.error) {
        throw new Error(json.error.message)
      } else {
        localStorage.removeItem("token")
        localStorage.removeItem("name")
      }

      this.setState({
        ...this.getState(),
        isLoggedIn: false,
        waiting: false
      });

      return true

    } catch (e) {

      this.setState({
        ...this.getState(),
        isLoggedIn: false,
        waiting: false
      });

      return false
    }
  }
}




export default AuthState;
