import StoreModule from "../module";

class AuthState extends StoreModule {
  initState() {
    const token = localStorage.getItem('userToken')
    return {
      user: null,
      error: null,
      waiting: false,
      isAuth: Boolean(token)
    };
  }

  resetAuth() {
    this.setState(this.initState())
  }

  async logIn(login, password) {
    this.setState( {...this.getState(), error: null , waiting: true});

    try {

      if (!login || !password) {
        throw new Error('Все поля обязательные!');
      }

      const response = await fetch('/api/v1/users/sign?fields=profile(name)', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.data.issues[0].message);
      }

      localStorage.setItem('userToken', data.result.token);

      this.setState({
        ...this.getState(),
        user: data.result.user.profile,
        isAuth: true,
        waiting: false
      });
    } catch (error) {
      this.setState({ error: error.message || 'Не удалось выполнить вход', waiting: false });
    }
  }

  async logOut() {
    try {
      const token = localStorage.getItem('userToken')
      if (token) {
        await fetch('/api/v1/users/sign', {
          method: 'DELETE',
          headers: { 'X-Token': token, 'Content-Type': 'application/json' },
        });
        localStorage.removeItem('userToken');
      }

      this.setState({  ...this.getState(), profile: null, isAuth: false });
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  }

  async sessionRecovery() {
    this.setState({  ...this.getState(), error: null , waiting: true});

    try {
      const token = localStorage.getItem('userToken')

      const response = await fetch('/api/v1/users/self?fields=profile(name)', {
        method: 'GET',
        headers: { 'X-Token': token, 'Content-Type': 'application/json' },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message);
      }

      this.setState({
        ...this.getState(),
        user: data.result.profile,
        isAuth: true,
        waiting: false,
      });
    } catch (error) {
      console.error('Ошибка получения профиля:', error);
      localStorage.removeItem('userToken')
      this.setState({
        ...this.getState(),
        waiting: false
      });
    }
  }
}

export default AuthState;