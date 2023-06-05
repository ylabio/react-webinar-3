import StoreModule from "../module";

class Authorization extends StoreModule {


  initState() {
    const token = localStorage.getItem('token');
    return {
      token,
      isLogin: token ? true : false,
      user: {},
      waiting: false
    }
  }

  async login(login, password) {
    const res = await fetch("/api/v1/users/sign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login,
        password,
        "remember": true
      }),
    });
    const json = await res.json();
    if (json.error) {
      return {
        error: json.error.data.issues.map(e => e.message).join(' ')
      }
    }

    localStorage.setItem('token', json.result.token)
    this.setState({
      ...this.getState(),
      isLogin: true,
      token: json.result.token,
      user: {
        name: json.result.user.profile.name
      },
      waiting: false
    }, 'логин')
    return {
      error: false
    }
  }

  async logout() {
    const res = await fetch("/api/v1/users/sign", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Token": this.getState().token,
      }
    });
    const json = await res.json();
    if (json.result) {
      localStorage.removeItem('token');
      this.setState({
        ...this.getState(),
        isLogin: false,
        user: {},
        token: ''
      })
    }
  }

  async initSession() {
    const token = this.getState().token
    const res = await fetch("/api/v1/users/self?fields=profile(name)", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Token": token,
      },
    });

    const json = await res.json();
    if(json.error) {
      localStorage.removeItem('token')
      this.setState({
        ...this.getState(),
        info: {},
        waiting: false
      })
      return
    }

    this.setState({
      ...this.getState(),
      user: {
        name: json.result.profile.name,
      },
      waiting: false
    })
  }
}

export default Authorization;
