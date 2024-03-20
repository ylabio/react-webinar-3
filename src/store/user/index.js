import StoreModule from "../module";

class UserState extends StoreModule {

  initState() {
    return {
      data: null,
      token: undefined,
      error: null,
      waiting: true,
    }
  }

  /**
   * Загрузка данных о пользователе
   * @return {Promise<void>}
   */
  async loadUser() {
    let token = this.getState().token || localStorage.getItem('userToken');
    if(!token) {
      this.setState({
        ...this.getState(),
        waiting: false
      });
      return;
    }

    this.setState({
      ...this.getState(),
      waiting: true
    });

    const requestOptions = {
      headers: {
        'X-Token': token,
        'Content-Type': 'application/json',
      }
    }

    try {
      const response = await fetch(`/api/v1/users/self?fields=_id,email,profile(name,phone)`,
      requestOptions);
      const json = await response.json();

      if(json.error?.code === 'Forbidden') {
        token = undefined;
        localStorage.removeItem('userToken');
      }

      this.setState({
        ...this.getState(),
        token,
        data: json.result || null,
        error: json.error || null,
        waiting: false
      }, 'Загрузка данных пользователя');

    } catch (e) {
      this.setState({
        ...this.getState(),
        error: {message: e.message},
        waiting: false
      }), 'Ошибка при загрузке данных пользователя';
    }
  }

  async logIn(data) {
    this.setState({
      ...this.getState(),
      waiting: true
    });

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    }

    try {
      const response = await fetch(
      '/api/v1/users/sign?fields=_id,email,profile(name,phone)',
      requestOptions
      );
      const json = await response.json();
      const token =json.result?.token;

      if(token) localStorage.setItem('userToken', token);
      const logMessage = token
        ? 'Пользователь авторизован'
        : 'В авторизации отказано'

      this.setState({
        ...this.getState(),
        token,
        data: json.result?.user || null,
        error: json.error || null,
        waiting: false
      }, logMessage);

    } catch (e) {
      this.setState({
        ...this.getState(),
        error: {message: e.message},
        waiting: false
      }), 'Ошибка при попытке авторизации';
    }
  }

  async logOut() {
    let token = this.getState().token || localStorage.getItem('userToken');
    if(!token) return;

    this.setState({
      ...this.getState(),
      waiting: true
    });

    const requestOptions = {
      method: 'DELETE',
      headers: {
        'X-Token': token,
        'Content-Type': 'application/json',
      }
    }

    try {
      const response = await fetch('/api/v1/users/sign', requestOptions);
      await response.json();

      localStorage.removeItem('userToken');

      this.setState({
        ...this.initState(),
        waiting: false,
      }, 'Авторизация сброшена');

    } catch (e) {
      this.setState({
        ...this.getState(),
        error: {message: e.message},
        waiting: false
      }), 'Ошибка при попытке сбросить авторизацию';
    }
  }

  resetError() {
    this.setState({
      ...this.getState(),
      error: null,
    })
  }
}

export default UserState;
