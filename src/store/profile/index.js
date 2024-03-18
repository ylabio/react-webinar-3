import StoreModule from "../module";

class ProfileState extends StoreModule {

  initState() {
    const token = localStorage.getItem('token');
    return {
      token: token ? token : '',
      error: '',
    }
  }

  async login(login, password) {
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
        error: json.error.message
      }, 'Ошибка при попытке авторизации');
    }
    if (json.result) {
      this.setState({
        ...this.getState(),
        token: json.result.token,
        error: '',
      }, "Успешная авторизация");
      localStorage.setItem('token', json.result.token);
      this.setUser();
    }
  }

  async setUser() {
    const response = await fetch('/api/v1/users/self', {
      headers: {
        'Content-Type': 'application/json',
        'X-Token': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    this.setState({
      ...this.getState(),
      user: json.result
    }, "Получение данных пользователя");
  }

  async logOut() {
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
      error: '',
    }, 'Выход пользователя');
  }
}

export default ProfileState;