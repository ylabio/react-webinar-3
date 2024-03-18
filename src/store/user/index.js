import StoreModule from "../module";

class UserState extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      user: {},
      token: localStorage.getItem('token') || '',
      isAuth: !!localStorage.getItem('token'),
      waiting: false,
      error: ''
    }
  }

  async login({login, password}) {
    // Начальные данные
    this.setState({
      ...this.getState(),
      waiting: true
    });
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({login, password})
      });
      const json = await response.json();

      localStorage.setItem('token', json.result.token)

      this.setState({
        ...this.getState(),
        user: json.result.user,
        token: json.result.token,
        isAuth: true,
        waiting: false
      }, 'Выполнена авторизация')
    } catch (e) {
      this.setState({
        user: {},
        waiting: false,
        isAuth: false,
        error: e.message
      })
    }
  }

  async signOut() {
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-token': this.getState().token
        },
      });

      this.setState({
        ...this.getState(),
        user: {},
        token: '',
        waiting: false,
        isAuth: false,
        error: ''
      })
      localStorage.removeItem('token');
  } catch (e) {
    this.setState({
      ...this.getState(),
      error: e.message
    })
    }
  }
}

export default UserState;