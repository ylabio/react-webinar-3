import StoreModule from "../module";

class SessionState extends StoreModule {

  initState() {
    return {
      token: '',
      user: {},
      waiting: false
    }
  }

  async logIn(login, password) {
    this.setState({
      token: '',
      user: {},
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
        token: '',
        user: {},
        waiting: false
      }, 'Ошибка при попытке авторизации');
      return json.error.data.issues[0].message;
    }
    if (json.result) {
      this.setState({
        token: json.result.token,
        user: {},
        waiting: false
      }, "Успешная авторизация");
      localStorage.setItem('token', json.result.token);
      await this.setUser();
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
        "X-Token": localStorage.getItem('token')
      }
    });
    localStorage.removeItem('token');
    this.setState({
      token: '',
      user: {},
      waiting: false
    }, 'Выход пользователя');
  }

  async tokenValidation() {
    this.setState({
      user: {},
      token: '',
      waiting: true
    }, 'Валидация токена');
    const response = await fetch('/api/v1/users/self', {
      headers: {
        'Content-Type': 'application/json',
        'X-Token': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    if (json.error) {
      this.setState({
        token: '',
        user: {},
        waiting: false
      }, 'Ошибка валидации токена')
    } else {
      this.setState({
        token: localStorage.getItem('token'),
        user: {},
        waiting: false
      }, 'Успешная валидация токена');
      await this.setUser();
    }
  }

  async setUser() {
    this.setState({
      ...this.getState(),
      waiting: true
    }, 'Загрузка пользователя');
    const response = await fetch('/api/v1/users/self', {
      headers: {
        'Content-Type': 'application/json',
        'X-Token': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    this.setState({
      ...this.getState(),
      user: json.result,
      waiting: false
    }, "Окончание загрузки пользователя");
  }
}

export default SessionState;