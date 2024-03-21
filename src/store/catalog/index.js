import { constructCategoryList } from "../../utils";
import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CatalogState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [],
      categories: [],
      params: {
        page: 1,
        limit: 10,
        sort: "order",
        category: "",
        query: "",
        lang: "",
      },
      count: 0,
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
    if (urlParams.has("page"))
      validParams.page = Number(urlParams.get("page")) || 1;
    if (urlParams.has("limit"))
      validParams.limit = Math.min(Number(urlParams.get("limit")) || 10, 50);
    if (urlParams.has("sort")) validParams.sort = urlParams.get("sort");
    if (urlParams.has("category"))
      validParams.category = urlParams.get("category");
    if (urlParams.has("query")) validParams.query = urlParams.get("query");
    if (urlParams.has("lang")) validParams.lang = urlParams.get("lang");
    await this.setParams(
      {
        ...this.initState().params,
        ...validParams,
        ...newParams,
      },
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

  /**
   * Установка параметров и загрузка списка товаров
   * @param [newParams] {Object} Новые параметры
   * @param [replaceHistory] {Boolean} Заменить адрес (true) или новая запись в истории браузера (false)
   * @returns {Promise<void>}
   */
  async setParams(newParams = {}, replaceHistory = false) {
    const params = { ...this.getState().params, ...newParams };

    // Установка новых параметров и признака загрузки
    this.setState(
      {
        ...this.getState(),
        params,
        waiting: true,
      },
      "Установлены параметры каталога"
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
      limit: params.limit,
      skip: (params.page - 1) * params.limit,
      fields: "items(*),count",
      sort: params.sort,
      lang: params.lang,
    };

    if (params.category) {
      apiParams["search[category]"] = params.category;
    }

    const apiCategoriesParams = {
      limit: "*",
      fields: "_id,title,parent(_id)",
      lang: params.lang,
    };

    const [responseArticles, responseCategories] = await Promise.all([
      fetch(`/api/v1/articles?${new URLSearchParams(apiParams)}`),
      fetch(`/api/v1/categories?${new URLSearchParams(apiCategoriesParams)}`),
    ]);

    const [articlesJson, categoriesJson] = await Promise.all([
      responseArticles.json(),
      responseCategories.json(),
    ]);

    this.setState(
      {
        ...this.getState(),
        list: articlesJson.result.items,
        count: articlesJson.result.count,
        categories: constructCategoryList(categoriesJson.result.items),
        waiting: false,
      },
      "Загружен список товаров и категории из АПИ"
    );
  }
}

export default CatalogState;
