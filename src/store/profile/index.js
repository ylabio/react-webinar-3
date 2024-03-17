import StoreModule from "../module";

/**
 * Авторизация пользователя
 */
class ProfileState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: null,
      waiting: false,
      message: ''
    }
  }

  /**
   * Получаем профиль
   */
  async getProfile() {
    const token = "token" in localStorage ? localStorage.token : "";

    if (!token) {
      this.setState({
        ...this.getState(),
        user: null,
        waiting: false,
        message: ''
      }, 'Установка пустого профиля');
      return;
    }

    // Установка новых параметров и признака загрузки
    this.setState({
      ...this.getState(),
      user: null,
      waiting: true,
      message: ''
    }, 'Запрос профиля');

    try {
      const response = await fetch(`/api/v1/users/self?fields=_id,email,profile(name,phone)`, { 
        method: 'get', 
        headers: new Headers({'X-Token': token})
      });

      const json = await response.json();
      const user = "result" in json ? json.result : null;

      this.setState({
        ...this.getState(),
        user,
        waiting: false
      }, user ? 'Загружен профиль из АПИ' : 'Не удалось загрузить профиль из АПИ');

    } catch (e) {
      this.setState({
        user: null,
        waiting: false
      }, 'Ошибка загрузки профиля из АПИ');
    }
  }

  /**
   * Логин
   */
  async login(login, password) {
    // Установка новых параметров и признака загрузки
    this.setState({
      ...this.getState(),
      user: null,
      waiting: true,
      message: ''
    }, 'Запрос авторизации');

    try {

      const data = new URLSearchParams();
      data.append("login", login);
      data.append("password", password);

      const response = await fetch(`/api/v1/users/sign?fields=_id,email,profile(name,phone)`, {
        method: 'post',
        body: data,
      });

      const json = await response.json();

      const result = "result" in json ? json.result : null;
      const token = result && "token" in result ? result.token : '';
      const user = result && "user" in result ? result.user : null;
      let message = "";

      if (!token || !user) {
        const error = "error" in json ? json.error : null;
        const errorData = error && "data" in error ? error.data : null;
        const issues = errorData && "issues" in errorData && Array.isArray(errorData.issues) ? errorData.issues : [];
        message = "Authorization error";
        for (let issue of issues) {
          if ("message" in issue && issue.message) {
            message = issue.message;
            break;
          }
        }
      }

      this.setState({
        ...this.getState(),
        user: token ? user : null,
        waiting: false,
        message
      }, 'Успешная авторизация');

      localStorage.setItem('token', token);

    } catch (e) {
      this.setState({
        waiting: false,
        user: null,
        message: 'Authorization error'
      }, 'Ошибка авторизации');
    }
  }

  /**
   * Выход
   */
  async logout() {
    const token = "token" in localStorage ? localStorage.token : "";

    if (!token) {
      this.setState({
        ...this.getState(),
        user: null,
        waiting: false,
        message: ''
      }, 'Установка пустого профиля');
      return;
    }

    // Установка новых параметров и признака загрузки
    this.setState({
      ...this.getState(),
      waiting: true,
      message: ''
    }, 'Запрос на выход из профиля');

    try {
      const response = await fetch(`/api/v1/users/sign`, { 
        method: 'delete', 
        headers: new Headers({'X-Token': token})
      });

      const json = await response.json();
      const result = "result" in json ? json.result : false;

      if (result) {
        this.setState({
          ...this.getState(),
          user: null,
          waiting: false
        }, 'Выход из профиля');
        localStorage.removeItem('token');
      } else {
        const error = "error" in json ? json.error : null;
        const message = error && "message" in eror && error.message ? error.message : "Logout error";
        this.setState({
          ...this.getState(),
          waiting: false,
          message
        }, 'Ошибка выхода из профиля');
      }

    } catch (e) {
      this.setState({
        user: null,
        waiting: false,
        message: "Logout error"
      }, 'Ошибка выхода из профиля');
    }
  }
}

export default ProfileState;
