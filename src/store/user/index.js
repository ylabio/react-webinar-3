import StoreModule from "../module";

/**
 * Детальная информация о пользователе
 */
class UserState extends StoreModule {

  initState() {
    return {
      autorization: false,
      error: 0,
      errorReally: '',
      data: {},
      waiting: false, // признак ожидания загрузки
      profile: false,
    }
  }

  // Сброс ошибки
  async fResetError() {
    this.setState({
      ...this.getState(),
        error: 0,
        errorReally: '',
    });
  }

  // Авторизация
  async fAutorization(login,password) {
    this.setState({
      ...this.getState(),
      waiting: true
    });
    let error = 0;
    let errorReally = '';    

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
        errorReally = json.error.data.issues[0].message;
        this.setState({
          ...this.getState(),
          error: error,
          errorReally: errorReally,
          autorization: false,
          data: {},
          waiting: false
        }, 'Сообщение об ощибке от сервера');
        return;
      }

      this.setState({
        ...this.getState(),
        error: 0,
        errorReally: '',
        token: json.result.token,
        autorization: true,
        data: {
          name: json.result.user.profile.name,
          phone: json.result.user.profile.phone,
          email: json.result.user.email
        },
        waiting: false
      }, 'Загружены данные пользователя из АПИ');
      localStorage.setItem('token', json.result.token);
      return json.result.token;
    } catch (e) {
      this.setState({
        ...this.getState(),
        error: 4,
        errorReally: '',
        autorization: false,
        data: {},
        waiting: false
      });
    }
    return;
  }

  // Выход
  async fExit() {
    let token = localStorage.getItem('token');
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
        autorization: false,
        data: {},
        waiting: false
      }, 'Выход пользователя с сайта');
      localStorage.setItem('token', '');
    } catch (e) {
      this.setState({
        ...this.getState(),
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
          error: 0,
          autorization: false,
          data: {},
          waiting: false
        });
      }
      else {
      this.setState({
        ...this.getState(),
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
        autorization: false,
        data: {},
        waiting: false
      });
    }
  }
}

export default UserState;
