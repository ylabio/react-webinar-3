import StoreModule from "../module";

class UserState extends StoreModule {

  initState() {
    return {
      data: {},
      error: null,
      waiting: false // признак ожидания загрузки
    }
  }

  async autoLogin() {
    const token = localStorage.getItem('X-Token');

    if(!token) return;

    const options = {
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token
      },
    };

    try {
      const response = await fetch('/api/v1/users/self?fields=*', options);
      const json = await response.json();

      // Даные пользователя успешно получены
      this.setState({
        data: json.result,
        waiting: false
      }, 'Получены данные пользователя');

    } catch (e) {
      // Ошибка при загрузке
      this.setState({
        data: {},
        error: e,
        waiting: false
      });
    }
  }

  async login(data) {

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...data, remember: true })
    };

    try {
      const response = await fetch('/api/v1/users/sign', options);
      const json = await response.json();

      if(json.error) throw new Error(json.error.data.issues[0].message);
      
      localStorage.setItem('X-Token', json.result.token);

      // Даные пользователя успешно получены
      this.setState({
        data: json.result.user,
        waiting: false
      }, 'Получены данные пользователя');

    } catch (e) {
      // Ошибка при загрузке
      this.setState({
        data: {},
        error: e,
        waiting: false
      });
    }
  }

  async signOut() {

    const token = localStorage.getItem('X-Token');

    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token
      }
    };

    try {
      const response = await fetch('/api/v1/users/sign', options);
      const json = await response.json();

      if (json) {
        // Выход произведен
        this.setState({
          data: {},
          waiting: false
        }, 'Выход произведен');

        localStorage.removeItem('X-Token');
      }
    } catch (e) {
      // Ошибка при загрузке
      this.setState({
        data: {},
        error: e,
        waiting: false
      });
    }
  }
}

export default UserState;
