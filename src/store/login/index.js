import StoreModule from "../module";

/**
 * Детальная ифнормация о товаре для страницы товара
 */
class LoginState extends StoreModule {

  initState() {
    return {
      user: null,
      error: null,
      waiting: false // признак ожидания загрузки
    }
  }

    /**
   * сбрасывает ошибки формы входа
   */
  resetError(){
    this.setState({...this.getState(), error: null});
  }

  /**
   * вход
   * @param login {String}
   * @param password {String}
   * @return {Promise<void>}
   */

  async login(login, password) {
    // установка признака ожидания загрузки
    this.setState({...this.getState(), waiting: true});

    const data = { "login": login, "password": password }

    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const json = await response.json();

      if (response?.ok) {

        localStorage.setItem('token', json.result.token);
        // Пользователь авторизован
        this.setState({ ...this.getState(), user: json.result.user, error: null });
        this.store.actions.auth.setAuth();

      } else {
        // Ошибка при загрузке
        this.setState({ ...this.getState(), error: `${json.error.data.issues[0].message}` })
      }

    } catch (e) {
      // Ошибка при загрузке
      this.setState({ ...this.getState(), error: `${e.name} ${e.message}` })
    }

    this.setState({ ...this.getState(), waiting: false })
  }

  /**
   * выход
   */
  async logout() {
    this.setState({ ...this.getState(), waiting: true });

    const token = localStorage.getItem('token');

    await fetch(`/api/v1/users/sign`, {
      method: "DELETE",
      headers: { "X-Token": token },
    });

    localStorage.removeItem("token");
    this.store.actions.auth.setAuth();
    this.setState({ ...this.getState(), user: null, waiting: false });

  }
}

export default LoginState;
