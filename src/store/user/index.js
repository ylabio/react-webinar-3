import StoreModule from "../module";

/**
 * Детальная информация о пользователе
 */
class UserState extends StoreModule {

  initState() {
    return {
      autorization: false,
      token: '',
      error: 0,
      login: '',
      password: '',
      data: {},
      waiting: false, // признак ожидания загрузки
      profile: false,
    }
  }

  async initParams() {
    const urlParams = new URLSearchParams(window.location.search);
    let validToken;
    if (urlParams.has('token')) {
      validToken = urlParams.get('token');
      if (validToken && validToken != '') {
        this.setState({...this.getState(), 
          autorization: false,
          token: validToken
        });
        this.fGetDataUser(validToken);
      }
    }
  }

  async resetParams() {
    await this.setParams('');
  }

  async setParams(token, replaceHistory = false, path = window.location.pathname) {
    if (token && token != '' &&
        path && path != '') {
    const url = path + '?token=' + token + window.location.hash;
    if (replaceHistory) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
    }
    }
  }

  // Авторизация
  async fAutorization(login,password) {
    this.setState({
      ...this.getState(),
      login: login,
      password: password,
      waiting: true
    });
    let error = 0;
    if (login == '' || password == '') {
      if(login == '') {
        error = 1;
      }
      else if(password == '') {
        error = 2;
      }
        this.setState({
          ...this.getState(),
          error: error,
          token: '',
          autorization: false,
          data: {},
          waiting: false
        }, 'Сообщение об ощибке');
      return '';
    }
    

    try {
      const apiParams = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          login: login,
          password: password
        })
      };

      const response = await fetch(`/api/v1/users/sign`,apiParams);
      const json = await response.json();

      if(json.error) {
        if (json.error.data.issues[0].message == 'Wrong login or password'){
          error = 3;
        }
        this.setState({
          ...this.getState(),
          error: error,
          token: '',
          autorization: false,
          data: {},
          waiting: false
        }, 'Сообщение об ощибке от сервера');
        return '';
      }

      this.setState({
        ...this.getState(),
        error: 0,
        token: json.result.token,
        autorization: true,
        data: {
          name: json.result.user.profile.name,
          phone: json.result.user.profile.phone,
          email: json.result.user.email
        },
        waiting: false
      }, 'Загружены данные пользователя из АПИ');
      return json.result.token;
    } catch (e) {
      this.setState({
        ...this.getState(),
        error: 4,
        token: '',
        autorization: false,
        data: {},
        waiting: false
      });
    }
    return '';
  }

  // Выход
  async fExit() {
    let token = this.getState().token;
    if (!token || token == '') return;
    this.setState({
      ...this.getState(),
      waiting: true
    });

    try {
      const apiParams = {
        method: 'DELETE',
        headers: {
          'X-Token': token
        }
      };

      const response = await fetch(`/api/v1/users/sign`,apiParams);
      const json = await response.json();

      this.setState({
        ...this.getState(),
        token: '',
        autorization: false,
        data: {},
        waiting: false
      }, 'Выход пользователя с сайта');

    } catch (e) {
      this.setState({
        ...this.getState(),
        token: '',
        autorization: false,
        data: {},
        waiting: false
      });
    }
  }

  // Взять данные пользователя
  async fGetDataUser(token) {
    if (!token || token == '') return;
    this.setState({
      ...this.getState(),
      waiting: true
    });
    
    try {
      const apiParams = {
        method: 'GET',
        headers: {
          'X-Token': token
        }
      };
      const response = await fetch(`/api/v1/users/self?fields=*`,apiParams);
      const json = await response.json();

      if(json.error) {
        console.log(json.error.data.issues[0].message);
        this.setState({
          ...this.getState(),
          error: 5,
          token: '',
          autorization: false,
          data: {},
          waiting: false
        });
      }
      else {
      this.setState({
        ...this.getState(),
        token: token,
        autorization: true,
        data: {
          name: json.result.profile.name,
          phone: json.result.profile.phone,
          email: json.result.email
        },
        waiting: false
      }, 'Загружены данные пользователя из АПИ'); 
      }
    } catch (e) {
      this.setState({
        ...this.getState(),
        token: '',
        autorization: false,
        data: {},
        waiting: false
      });
    }
  }
}

export default UserState;
