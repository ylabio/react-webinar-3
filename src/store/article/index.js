import StoreModule from "../module";

/**
 * Детальная информация о товаре для страницы товара
 */
class ArticleState extends StoreModule {
  initState() {
    return {
      data: {},
      params: {
        lang: "",
      },
      waiting: false, // признак ожидания загрузки
    };
  }

  async setParams(id, newParams = {}, replaceHistory = false) {
    const params = { ...this.getState().params, ...newParams };

    // Установка новых параметров и признака загрузки
    this.setState(
      {
        ...this.getState(),
        params,
        data: {},
        waiting: true,
      },
      "Установлены параметры продукта"
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

    const apiArticleParams = {
      fields: "*,madeIn(title,code),category(title)",
      lang: params.lang,
    };

    try {
      const response = await fetch(
        `/api/v1/articles/${id}?${new URLSearchParams(apiArticleParams)}`
      );
      const json = await response.json();

      // Товар загружен успешно
      this.setState(
        {
          ...this.getState(),
          data: json.result,
          waiting: false,
        },
        "Загружен товар из АПИ"
      );
    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({ ...this.getState(), data: {}, waiting: false });
    }
  }

  async initParams(id, newParams = {}) {
    const urlParams = new URLSearchParams(window.location.search);
    let validParams = {};
    if (urlParams.has("lang")) validParams.lang = urlParams.get("lang");
    await this.setParams(
      id,
      {
        ...this.initState().params,
        ...validParams,
        ...newParams,
      },
      true
    );
  }
}

export default ArticleState;
