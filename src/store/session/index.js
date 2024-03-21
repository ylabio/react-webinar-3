import StoreModule from "../module";

class SessionState extends StoreModule{

  initState() {
    const token = localStorage.getItem('token');
    return {
      token: token ? token : '',
      waiting: false
    }
  }

  async logIn(login, password) {
    this.setState({
      token: '',
      waiting: true
    });
    const response = await fetch('/api/v1/users/sign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        'login': login,
        'password': password
      })
    });
    const json = await response.json();
    console.log(json);
    if (json.error) {
      this.setState({
        ...this.getState(),
        waiting: false
      }, 'Ошибка при попытке авторизации');
      return json.error.data.issues[0].message;
    }
    if (json.result) {
      this.setState({
        token: json.result.token,
        waiting: false
      }, "Успешная авторизация");
      localStorage.setItem('token', json.result.token);
      return '';
    }
  }

  async logOut() {
    this.setState({
      ...this.getState(),
      waiting: true
    });
    const response = await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "X-Token" : localStorage.getItem('token')
      }
    });
    localStorage.removeItem('token');
    this.setState({
      token: '',
      waiting: false
    }, 'Выход пользователя');
  }
}

export default SessionState;