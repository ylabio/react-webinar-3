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
      params: {
        page: 1,
        limit: 10,
        sort: 'order',
        query: '',
        categorySort: 'Все',
      },
      count: 0,
      waiting: false,
      categories: [],
    }
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
    if (urlParams.has('page')) validParams.page = Number(urlParams.get('page')) || 1;
    if (urlParams.has('limit')) validParams.limit = Math.min(Number(urlParams.get('limit')) || 10, 50);
    if (urlParams.has('sort')) validParams.sort = urlParams.get('sort');
    if (urlParams.has('query')) validParams.query = urlParams.get('query');
    if (urlParams.has('categorySort')) validParams.categorySort = urlParams.get('categorySort');
    await this.setParams({...this.initState().params, ...validParams, ...newParams}, true);
  }

  /**
   * Сброс параметров к начальным
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async resetParams(newParams = {}) {
    // Итоговые параметры из начальных, из URL и из переданных явно
    const params = {...this.initState().params, ...newParams};
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
    const params = {...this.getState().params, ...newParams};

    // Установка новых параметров и признака загрузки
    this.setState({
      ...this.getState(),
      params,
      waiting: true
    }, 'Установлены параметры каталога');

    // Сохранить параметры в адрес страницы
    let urlSearch = new URLSearchParams(params).toString();
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
      'search[query]': params.query
    };

    if (params.categorySort && params.categorySort !== 'Все') {
      const categoryId = this.getState().categories.find(item => item.title === params.categorySort)?._id;
      apiParams['search[category]'] = categoryId;
    }

    const response = await fetch(`/api/v1/articles?${new URLSearchParams(apiParams)}`);
    const json = await response.json();

    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count,
      waiting: false
    }, 'Загружен список товаров из АПИ');
  }

  async loadCategories() {
    const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
    const json = await response.json();
    const categories = json.result.items;
    const sortedCategories = this.setCategories(categories);

    this.setState({
      ...this.getState(),
      categories: [{_id: '', title: 'Все', parent: null}, ...sortedCategories],
    });
  }

  setCategories(categories, parentId = null, nestLevel = 0) {
    const sortedCategories = [];
    categories.forEach(category => {
      if (category.parent && category.parent._id === parentId || (!category.parent && !parentId)) {
        sortedCategories.push({
          _id: category._id,
          title: `${('-').repeat(nestLevel)} ${category.title}`,
          parent: parentId,
        })
        const nestedCategories = this.setCategories(categories, category._id, nestLevel + 1);
        sortedCategories.push(...nestedCategories);
      }
    });
    return sortedCategories;
  }
}

export default CatalogState;
