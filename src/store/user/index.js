import StoreModule from "../module";

class User extends StoreModule {
  initState() {
    return {
      isAuth: false,
      data: {},
      waiting: false,
      errorMessage: '',
    };
  }

  async initParams(newParams = {}) {
    const token = window.localStorage.getItem('token');
  
    if (token) {
      const response = await fetch('/api/v1/users/self?fields=profile,email', {
        method: 'GET',
        headers: {
          'X-Token': token,
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        const { result } = await response.json();
        await this.setParams({
          ...this.initState(),
          data: result,
          isAuth: true});
      } else {
        window.localStorage.removeItem('token');
      }
    }
  }
  
  async setParams(newParams = {}) {
    this.setState({
      ...this.getState(),
      ...newParams
    }, 'Установлены параметры юзера');
  }


  async login(username, password) {
    this.setState({ waiting: true });
    const response = await fetch('/api/v1/users/sign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ login: username, password: password })
    });
    if (response.ok) {
      const {result} = await response.json();
      const {user, token} = result;
      localStorage.setItem('token', token);
      this.setState({
        isAuth: true,
        data: user,
        waiting: false
      });
    } else {
      const {error} = await response.json();
      this.setState({
        ...this.getState(),
        errorMessage: error.message,
        waiting: false
      });
    }
  }

  async logout() {
    window.localStorage.removeItem('token');
    const params = this.initState();
    await this.setParams({
      ...params
    }, 'Выполнен логаут');
  }

}

export default User;
