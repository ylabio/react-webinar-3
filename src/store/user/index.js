import StoreModule from "../module";

class UserState extends StoreModule {

  initState() {
    return {
      userProfile: {
        email: '',
        name: '',
        phone: ''
      },
      token: '',
      waiting: false,
      serverError: [],
      loginStatus: false
    };
  }

  setProfile(userProfile = {}) {
    this.setState({
      ...this.getState(),
      userProfile
    }, 'Добавление информации о пользователе');
  }

  setToken(token = '') {
    this.setState({
      ...this.getState(),
      token
    }, 'Добавление токена');
  }

  async login(login, password) {
    this.setState({
      ...this.getState(),
      waiting: true
    });

    const res = await fetch('/api/v1/users/sign', {
      method: 'POST',
      body: JSON.stringify({login, password/*, remember: true*/}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await res.json();
    if (res.ok) {
      console.log(json);
      this.setState({
        ...this.getState(),
        userProfile: {
          name: json.result.user.profile.name,
          email: json.result.user.email,
          phone: json.result.user.profile.phone
        },
        token: json.result.token,
        loginStatus: true,
        waiting: false
      }, 'Успешный логин');
      localStorage.setItem('token', json.result.token);
      return true;
    } else {
      let errMsgList = [json.error.message];
      if (json.error.data && json.error.data.issues && json.error.data.issues[0]) {
        errMsgList = json.error.data.issues.map((issue) => issue.message);
      }
      this.setState({
        ...this.getState(),
        serverError: [...errMsgList],
        waiting: false
      }, 'Ошибка логина');
      return false;
    }
  }

  async logout() {
    const res = await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': this.getState().token
      }
    });
    if (res.ok) {
      this.setState({
        ...this.initState()
      }, 'Ошибка выхода');
      localStorage.removeItem('token');
      const data = await res.json();
      console.log(data);
    }
  }

  async getUserInfo() {
    const res = await fetch('/api/v1/users/self', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': this.getState().token
      }
    });
    const json = await res.json();
    if (res.ok) {
      this.setState({
        ...this.getState(),
        userProfile: {
          name: json.result.profile.name,
          phone: json.result.profile.phone,
          email: json.result.email,
        }
      }, 'Успешная загрузка данных пользователя');
    } else {
      throw new Error('Ошибка запроса данных пользователя', { cause: json });
    }
  }

  async checkLoginStatus() {
    const token = localStorage.getItem('token');
    if (token === null) {
      this.setState({
        ...this.initState()
      }, 'Токен отсутствует');
    } else {
      this.setState({
        ...this.getState(),
        token,
        loginStatus: true,
      }, 'Загрузка токена');
      try {
        await this.getUserInfo();
        this.setState({
          ...this.getState(),
          loginStatus: true,
        }, 'Установка статуса логина');
        return true;
      } catch (e) {
        this.setState({
          ...this.initState()
        }, 'Токен неверен');
        return false;
      }
    }
  }
}

export default UserState;
