import StoreModule from "../module";

class SessionState extends StoreModule {
  initState() {
    return {
      authData: {},
      token: null,
      waiting: true,
      isAuth: false
    }
  }

  setSession(authData, token) {
    localStorage.setItem('token', token);
    this.setState({...this.getState(), authData, token, isAuth: true, waiting: false}, 'Установка сессии');
  }

  async deleteSession() {
    this.setState({...this.getState(), waiting: true})
    const response = await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: {
        'X-Token': this.getState().token,
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200) {
      this.setState({authData: {}, waiting: false, isAuth: false, token: null});
      localStorage.removeItem('token');
    }
  }

  async self() {
    this.setState({...this.getState(), error: null});
    if (localStorage.getItem('token')) {
      const response = await fetch('/api/v1/users/self', {
        headers: {
          'X-Token': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 403) {
        localStorage.removeItem('token');
        this.setState({...this.getState(), waiting: false, isAuth: false}, 'Сброс состояния');
      } else {
        const json = await response.json();
        this.setSession(json.result, localStorage.getItem('token'))
      }
    } else {
      this.setState({...this.getState(), waiting: false, isAuth: false}, 'Сброс состояния')
    }
  }

  clear() {
    this.setState({...this.getState(), isAuth: false})
  }
}

export default SessionState;
