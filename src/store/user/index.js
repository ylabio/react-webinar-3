import StoreModule from "../module";

class User extends StoreModule {
  initState() {
    return {
      isAuth: false,
      data: {},
      waiting: false,
      errorMessage: '',
    };
  }

  async initParams(newParams = {}) {
    const token = window.localStorage.getItem('token');
    if (token) {
      const response = await fetch('/api/v1/users/self?fields=profile,email', {
        method: 'GET',
        headers: {
          'X-Token': token,
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        const { result } = await response.json();
        this.setParams({
          ...this.initState(),
          data: result,
          isAuth: true,
          waiting: false
        }, 'Инициализация юзера успешна');
      } else {
        window.localStorage.removeItem('token');
        this.setParams({
          ...this.initState()
        }, 'Инициализация юзера не успешна');
      }
    }
  }
  
  async setParams(newParams = {}) {
    this.setState({
      ...this.getState(),
      ...newParams
    }, 'Установлены параметры юзера');
  }


  // async login(username, password) {
  //   this.setState({ waiting: true });
  //   const response = await fetch('/api/v1/users/sign', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ login: username, password: password })
  //   });
  //   if (response.ok) {
  //     const {result} = await response.json();
  //     const {user, token} = result;
  //     localStorage.setItem('token', token);
  //     this.setState({
  //       ...this.getState(),
  //       isAuth: true,
  //       data: user,
  //       waiting: false,
  //     }, 'Аутентификация успешна');
  //   } else {
  //     const {error} = await response.json();
  //     this.setState({
  //       ...this.getState(),
  //       errorMessage: error.data.issues[0].message,
  //       waiting: false
  //     }, 'Аутентификация ошибка');
  //   }
  // }
  async login(username, password) {
    this.setState({ 
      ...this.getState(),
      waiting: true 
    },'Пауза');
    const response = await fetch('/api/v1/users/sign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ login: username, password: password })
    });
    if (response.ok) {
      const { result } = await response.json();
      const { user, token } = result;
      localStorage.setItem('token', token);  
      this.setState({
        isAuth: true,
        data: user,
        waiting: false,
      }, 'Аутентификация успешна');
        return true;
    } else {
      const { error } = await response.json();
      this.setState({
        errorMessage: error.data.issues[0].message,
        waiting: false,
        isAuth: false 
      }, 'Аутентификация ошибка');
      throw new Error(error.data.issues[0].message);
    }
  }
  
  async logout() {
    this.setState({
      ...this.getState(),
      waiting: true
    }, 'Ожидание');
    const token = window.localStorage.getItem('token');
    const response = await fetch('api/v1/users/sign', {
      method: 'DELETE',
      headers: {
        'X-Token': token,
        'Accept': 'application/json'
      }
    });
    if (response.ok) {
      window.localStorage.removeItem('token');
      this.setParams({
        ...this.initState()
      }, 'Выполнен логаут');
    } else {
      this.setParams({
        ...this.initState()
      }, 'Произошла ошибка при логауте');
    }
  }

  clearParams() {
    window.localStorage.removeItem('token');
    this.setState({
      ...this.initState(),
      waiting: false
    }, 'Параметры очищены')
  }
}

export default User;
