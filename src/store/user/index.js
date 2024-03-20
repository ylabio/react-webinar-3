import { deleteCookie, getCookie } from "../../utils";
import StoreModule from "../module";

class UserState extends StoreModule {

  initState() {
    return {
      data: {},
      error: null,
      waiting: true // признак ожидания загрузки
    }
  }

  async autoLogin() {
    
    const token = getCookie('token');

    if(!token) {
      this.setState({
        ...this.getState(),
        waiting: false
      }, 'Получены данные пользователя');
      return;
    };

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
        ...this.getState(),
        data: json.result,
        error: null,
        waiting: false
      }, 'Получены данные пользователя');
      
    } catch (e) {
      // Ошибка при загрузке
      this.setState({
        ...this.getState(),
        error: e,
        waiting: false
      });
    }
  }

  async login(data) {

    this.setState({
      ...this.getState(),
      waiting: true
    }, 'Загрузка');

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

      if (json.error) throw new Error(json.error.data.issues[0].message);

      // Даные пользователя успешно получены
      this.setState({
        data: json.result.user,
        error: null,
        waiting: false
      }, 'Получены данные пользователя');

    } catch (e) {
      // Ошибка при загрузке
      this.setState({
        ...this.getState(),
        error: e,
        waiting: false
      });
    }
  }

  async signOut() {

    const token = getCookie('token');

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
          error: null,
          waiting: false
        }, 'Выход произведен');

        deleteCookie('token');
      }
    } catch (e) {
      // Ошибка при загрузке
      this.setState({
        ...this.getState(),
        error: e,
        waiting: false
      });
    }
  }

  clear () {
    this.setState({
      data: {},
      error: null,
      waiting: false
    });
  }
}

export default UserState;
