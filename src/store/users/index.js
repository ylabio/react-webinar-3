import StoreModule from "../module";


class UsersState extends StoreModule {

  initState() {
    return {
      data: {},
      waiting: false, // признак ожидания загрузки
      error: null
    }
  }

  async checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    try {
      const response = await fetch(`/api/v1/users/self?fields=_id,email,profile(name, phone)`, {
        method: 'GET',
        headers:  {
          'Content-Type': 'application/json',
          'X-Token': token
        }
      });
      const json = await response.json();
      this.setState({
        data: json.result,
        waiting: false
      }, 'Авторизация прошла успешно!');
    } catch (e) {
      this.setState({
        data: {},
        waiting: false,
        error: e
      });
    }

  }

  async login(data) {
    try {
      const response = await fetch(`/api/v1/users/sign?fields=_id,email,profile(name, phone)`, {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          remember: true
        }),
        headers:  {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      if (json.error) {
        throw new Error(json.error.data.issues[0].message)
      }

      localStorage.setItem('token', json.result.token)

      // Товар загружен успешно
      this.setState({
        data: json.result.user,
        waiting: false
      }, 'Авторизация прошла успешно!');

    } catch (e) {

      // Ошибка при загрузке
      this.setState({
        data: {},
        waiting: false,
        error: e
      });
    }
  }

  async logout() {
    const token = localStorage.getItem('token');
    try {
      await fetch(`/api/v1/users/sign`, {
        method: 'DELETE',
        headers:  {
          'Content-Type': 'application/json',
          'X-Token': token
        }
      });
      this.setState({
        data: {},
        waiting: false
      }, 'Авторизация прошла успешно!');
      localStorage.removeItem('token')
    } catch (e) {
      this.setState({
        waiting: false,
        error: e
      });
    }
  }
}

export default UsersState;
