import StoreModule from "../module";

/**
 * Модуль страницы логина. Чтоб UserState не перегружать
 */
class LoginState extends StoreModule {

  initState() {
    return {
      login: '',
      password: '',
      error: null,
      waiting: false
    };
  }

  setLogin(login) {
    this.setState({
      ...this.getState(),
      login
    }, 'Логин: ' + login);
  }

  setPassword(password) {
    this.setState({
      ...this.getState(),
      password
    }, 'Пароль: ' + password);
  }

  async login() {
    this.setState({
      ...this.getState(),
      error: null, // надо уточнить где обнулять
      waiting: true
    }, 'Вход...');

    const st = this.getState();
    const json = await (
      await fetch('/api/v1/users/sign', {
        method: 'POST',
        body: JSON.stringify({ login: st.login, password: st.password }),
        headers: { 'Content-Type': 'application/json' }
      })
    ).json();
    //console.log('login: json:', json);

    if (json.error) {
      //console.log('login: json.error:', json.error);
      let error = '';
      const issues = json.error.data?.issues; // там еще какието ошибки в массиве, надо собирать?
      if (issues && issues.length) {
        issues.forEach(issue => {
          error += issue.message + '\n';
        });
      } else
        error = json.error.code + ': ' + json.error.message;

      this.setState({
        login: '', // не надо это хранить, все потрем
        password: '',
        error,
        waiting: false
      }, 'Код ошибки: ' + json.error.code);
      return;
    }

    // костыль, чтоб както передать параметры в модель юзера
    this.store.actions.profile.setUserData(json.result.user);
    this.store.actions.user.setToken(json.result.token);

    this.setState({
      login: '',
      password: '',
      error: null,
      waiting: false
    }, 'Вход выполнен.');
  }

  resetError() {
    this.setState({
      ...this.getState(),
      error: null
    }, 'Сброс ошибки загрузки.');
  }
}

export default LoginState;