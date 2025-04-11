import StoreModule from '../module';

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
        sort: 'order',
        query: '',
        category: '',
      },
      count: 0,
      waiting: false,
    };
  }

  /**
   * Загрузка списка категорий
   */
  async loadCategories() {
    // Если категории уже загружены или идет загрузка, то пропустить
    if (this.getState().categoriesLoaded || this.getState().categoriesWaiting) {
      return;
    }

    this.setState(
      {
        ...this.getState(),
        categoriesWaiting: true,
      },
      'Загрузка категорий',
    );

    try {
      const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)`);
      const json = await response.json();
      if (json.error) throw new Error(json.error);

      this.setState(
        {
          ...this.getState(),
          categories: json.result.items,
          categoriesLoaded: true,
          categoriesWaiting: false,
        },
        'Категории загружены',
      );
    } catch (e) {
      console.error('Ошибка загрузки категорий:', e);
      this.setState(
        {
          ...this.getState(),
          categories: [],
          categoriesLoaded: false,
          categoriesWaiting: false,
        },
        'Ошибка загрузки категорий',
      );
    }
  }

  /**
   * Инициализация параметров.
   * Восстановление из адреса
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async initParams(newParams = {}) {
    await this.loadCategories();

    const urlParams = new URLSearchParams(window.location.search);
    let validParams = {};
    if (urlParams.has('page')) validParams.page = Number(urlParams.get('page')) || 1;
    if (urlParams.has('limit'))
      validParams.limit = Math.min(Number(urlParams.get('limit')) || 10, 50);
    if (urlParams.has('sort')) validParams.sort = urlParams.get('sort');
    if (urlParams.has('query')) validParams.query = urlParams.get('query');
    if (urlParams.has('category')) validParams.category = urlParams.get('category');

    await this.setParams({ ...this.initState().params, ...validParams, ...newParams }, true);
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
    const currentState = this.getState();
    let params = { ...currentState.params, ...newParams };

    // Сброс страницы на первую, если изменилась категория, но только если она реально изменилась
    // Проверяем, есть ли category в newParams и отличается ли оно от текущего
    if ('category' in newParams && newParams.category !== currentState.params.category) {
      params.page = 1;
    }

    // Сброс страницы на первую, если изменился поисковый запрос
    if ('query' in newParams && newParams.query !== currentState.params.query) {
      params.page = 1;
    }

    // Установка новых параметров и признака загрузки
    this.setState(
      {
        ...this.getState(),
        params,
        waiting: true,
      },
      'Установлены параметры каталога',
    );

    // Сохранить параметры в адрес страницы
    const Lparams = {};
    for (const key in params) {
      if (params[key]) {
        // Не добавляем пустые параметры в URL (например, category: '')
        Lparams[key] = params[key];
      }
    }

    let urlSearch = new URLSearchParams(Lparams).toString();
    const url = window.location.pathname + '?' + urlSearch + window.location.hash;
    if (replaceHistory) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
    }

    const apiParams = {
      limit: params.limit,
      skip: (params.page - 1) * params.limit,
      fields: 'items(*),count',
      sort: params.sort,
      'search[query]': params.query,
    };

    if (params.category) {
      apiParams['search[category]'] = params.category;
    }

    const response = await fetch(`/api/v1/articles?${new URLSearchParams(apiParams)}`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items || [],
        count: json.result.count || 0,
        waiting: false,
      },
      'Загружен список товаров из АПИ',
    );
  }
}

export default CatalogState;
