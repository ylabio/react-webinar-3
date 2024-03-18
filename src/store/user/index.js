import StoreModule from "../module";

class User extends StoreModule {
  initState() {
    return {
      waiting: false,
      loggedIn: false,
      userInfo: {
        profile: {}
      },
      loginError: '',
      token: localStorage.getItem('token') || '',
    }
  }

  async auth() {
    this.setState({...this.getState(), waiting: true})
    const response = await fetch(`/api/v1/users/self?fields=*`, {
      method: "GET",
      headers: {
        "X-Token": this.getState().token,
        "Content-Type": "application/json",
      }
    })
    const json = await response.json();
    if (!json.error) {
      this.setState({
        ...this.getState(),
        userInfo: json.result,
        loggedIn: true,
        waiting: false,
      }, 'Успешно авторизован');
      return true
    } 
    this.setState({
      ...this.getState(),
      loggedIn: false,
      userInfo: {},
      waiting: false,
    }, 'Ошибка авторизации');
    return false
  }

  async login({ login, password }) {
    this.setState({...this.getState(), waiting: true})
    const response = await fetch(`/api/v1/users/sign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, password }),
    });
    const json = await response.json();
    if (!json.error) {
      localStorage.setItem('token', json.result.token)
      this.setState({
        ...this.getState(),
        userInfo: json.result.user,
        token: json.result.token,
        loginError: '',
        waiting: false,
        loggedIn: true
      }, 'Успешно авторизован');
      return true
    }
    localStorage.setItem('token', '')
    this.setState({
      ...this.getState(),
      userInfo: {},
      token: '',
      loginError: json.error.message,
      waiting: false,
      loggedIn: false
    }, 'Ошибка авторизации');
    return false
  }

  async logout() {
    this.setState({...this.getState(), waiting: true})
    const response = await fetch(`/api/v1/users/sign`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Token": this.getState().token,
      },
    });
    const json = await response.json();
    localStorage.setItem('token', '')
    if (json.result) {
      this.setState({
        ...this.getState(),
        userInfo: {},
        token: '',
        loginError: '',
        waiting: false,
        loggedIn: false
      }, 'Успешно разовторизован');
    }
  }
}

export default User;
