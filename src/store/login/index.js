import StoreModule from "../module";

class loginState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      loginData: {},
      waiting: false,
      error: null
    }
  }

  async login(data) {

    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...data, remember: true}),
    }
    
    this.setState({
      ...this.getState(),
      waiting: true,
    })

    try {
      const response = await fetch('api/v1/users/sign', options)
      const json = await response.json();
      if (!json.result) throw new Error(json.error.data.issues[0].message);

      localStorage.setItem('X-token', json.result.token);
      
      this.setState({
        loginData: json.result.user,
        waiting: false,
        error: null,
      }, 'Успешная авторизация')
      
    } catch (err) {
        this.setState({
          loginData: {},
          waiting: false,
          error: err,
        })
  }
  }

  async autoLogin() {
    this.setState({
      ...this.getState(),
      waiting: true,
    })
    const token = localStorage.getItem('X-token');
    if (!token) return;

    const options = {
      headers: {
        "Content-Type": "application/json",
        "X-Token": token
      },
      
    }
    try {
      const response = await fetch('api/v1/users/self?fields=*', options);
      const json = await response.json();
      this.setState({
        loginData: json.result,
        waiting: false,
        error: null
      })
    } catch (err) {
      this.setState({
        loginData: {},
        waiting: false,
        error: err
      })
    }
  }

  async logout() {
    this.setState({
      ...this.getState(),
      waiting: true
    })
    const token = localStorage.getItem('X-token');

    const options = {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "X-Token": token
      }
    }

    try {
      const response = await fetch('api/v1/users/sign', options);
      const json = response.json();
      if (json) {
        this.setState({
          loginData: {},
          waiting: false,
          error: null,
        }, 'Выход из аккаунта успешен')
      }
      localStorage.removeItem('X-token');
    } catch (err) {
      this.setState({
        loginData: {},
        error: err,
        waiting: false
      })
    }
  }
}

export default loginState;