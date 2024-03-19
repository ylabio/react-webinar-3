import StoreModule from "../module";

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
      user: null,
      params: {
        login: "",
        password: "",
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
  async initParams(newParams = {}) {
    const urlParams = new URLSearchParams(window.location.search);
    let validParams = {};
    if (urlParams.has("login")) validParams.query = urlParams.get("login");
    if (urlParams.has("password"))
      validParams.category = urlParams.get("password");
    await this.setParams(
      { ...this.initState().params, ...validParams, ...newParams },
      true
    );
  }

  /**
   * Сброс параметров к начальным
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async resetParams(newParams = {}) {
    // Итоговые параметры из начальных, из URL и из переданных явно
    const params = { ...this.initState().params, ...newParams };
    // Установка параметров и загрузка данных
    await this.setParams(params);
  }

  setPassword(newPassword) {
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

    const apiParams = {
      login: params.login,
      password: params.password,
    };
    const response = await fetch(`/api/v1/users/sign`, {
      method: "POST",
      headers: {
        "X-Token":
          "0fde46478ddbf96c7328043996955ba30d133faeedd6d17461222c62a9b84240",
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
        waiting: false,
      },
      "Загружен ответ из АПИ"
    );
  }
}

export default UsersState;
