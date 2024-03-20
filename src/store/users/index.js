import StoreModule from "../module";

function getCookie(name) {
  let cookie = document.cookie.split('; ').find(row => row.startsWith(name + '='));
  return cookie ? cookie.split('=')[1] : '';
}
/**
 * Состояние каталога - параметры фильтра и список товара
 */
class UsersState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: getCookie("user") != '' ? JSON.parse(getCookie("user")) : null,
      userName: getCookie("userName"),
      params: {
        login: getCookie("login"),
        password: getCookie("password"),
        remember: true,
      },
      waiting: false,
    };
  }

  /**
   * Инициализация параметров.
   * Восстановление из адреса
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async initParams() {
    document.cookie = "token=token";
    const urlParams = new URLSearchParams(window.location.search);
    let validParams = {};
    if (urlParams.has("login")) validParams.query = urlParams.get("login");
    if (urlParams.has("password"))
      validParams.category = urlParams.get("password");
    if (
      this.getState().params.login != '' &&
      this.getState().params.password != ''
    ) {
      this.getInfo();
    }
  }

  /**
   * Сброс параметров к начальным
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async resetParams(newParams = {}) {
    // Итоговые параметры из начальных, из URL и из переданных явно
    const params = { ...this.initState().params, ...newParams };
    document.cookie = "login=";
    document.cookie = "password=";
    document.cookie = "userName=";
    document.cookie = "user=";
    this.setState(
      {
        ...this.getState(),
        user: null,
        userName: null,
        params: { login: "", password: "" },
        waiting: false,
      },
      "Очищены параметры пользователя"
    );
  }

  setPassword(newPassword) {
    document.cookie = `password=${newPassword}`;
    this.setState(
      {
        ...this.getState(),
        params: { login: this.getState().params.login, password: newPassword },
        waiting: false,
      },
      "Установлены параметры пользователя"
    );
  }

  setLogin(newLogin) {
    document.cookie = `login=${newLogin}`;
    this.setState(
      {
        ...this.getState(),
        params: { login: newLogin, password: this.getState().params.password },
        waiting: false,
      },
      "Установлены параметры пользователя"
    );
  }
  /**
   * Установка параметров и загрузка списка товаров
   * @param [newParams] {Object} Новые параметры
   * @param [replaceHistory] {Boolean} Заменить адрес (true) или новая запись в истории браузера (false)
   * @returns {Promise<void>}
   */
  async getInfo(newParams = {}, replaceHistory = false) {
    const params = { ...this.getState().params, ...newParams };

    // Установка новых параметров и признака загрузки
    this.setState(
      {
        ...this.getState(),
        params,
        waiting: true,
      },
      "Установлены параметры пользователя"
    );

    // Сохранить параметры в адрес страницы
    let urlSearch = new URLSearchParams(params).toString();
    const url =
      window.location.pathname + "?" + urlSearch + window.location.hash;
    if (replaceHistory) {
      window.history.replaceState({}, "", url);
    } else {
      window.history.pushState({}, "", url);
    }

    const response = await fetch(`/api/v1/users/sign`, {
      method: "POST",
      headers: {
        "X-Token": getCookie("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: params.login,
        password: params.password,
        remember: true,
      }),
      login: params.login,
      password: params.password,
    });
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        user: json,
        userName: json.result ? json.result.user.profile.name : null,
        waiting: false,
      },
      "Загружен ответ из АПИ"
    );
    document.cookie = `user=${JSON.stringify(this.getState().user)}`;
    document.cookie = `userName=${this.getState().userName }`;
  }

  async deleteInfo() {
    const response = await fetch(`/api/v1/users/sign`, {
      method: "DELETE",
      headers: {
        "X-Token": getCookie("token"),
        "Content-Type": "application/json",
      },
    });
    this.resetParams();
  }
}

export default UsersState;
