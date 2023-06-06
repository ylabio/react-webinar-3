import StoreModule from "../module";

/**
 * Модуль страницы логина.
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

    if (json.error) {
      let error = '';
      const issues = json.error.data?.issues;
      if (issues && issues.length) {
        issues.forEach(issue => {
          error += issue.message + '\n';
        });
      } else
        error = json.error.code + ': ' + json.error.message;

      this.setState({
        login: '',
        password: '',
        error,
        waiting: false
      }, 'Код ошибки: ' + json.error.code);
      return;
    }

    // полученый токен кладем в стор сесии, и там далее работаем с ним
    this.store.actions.session.setToken(json.result.token);

    // и поля юзера, чтоб сразу пометить сессию, как начатую
    this.store.actions.session.setUser(json.result.user);

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
    }, 'Сброс ошибки логина.');
  }
}

export default LoginState;