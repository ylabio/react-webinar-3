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
        category: 'Все',
        query: ''
      },
      categories: [{
        _id: '',
        title: 'Все',
        parent: null
      }],
      count: 0,
      waiting: false
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

    //формируем apiParams с и без категорий
    const apiParams = {
      limit: params.limit,
      skip: (params.page - 1) * params.limit,
      fields: 'items(*),count',
      sort: params.sort,      
      'search[query]': params.query
    }
    if (params.category !== 'Все')
        apiParams['search[category]'] = this.getState().categories.find((item) => params.category == item.title)._id

    const response = await fetch(`/api/v1/articles?${new URLSearchParams(apiParams)}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count,
      waiting: false
    }, 'Загружен список товаров из АПИ');
  }

  async getCategories() {
    const categoriesResp = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*'); //также через API достаем список категорий для сортировки
    const categoriesJson = await categoriesResp.json();
    const sortedCategories = [];
    categoriesJson.result.items.forEach((item) => {
      if (!item.parent) {
        sortedCategories.push({_id: item._id, title: item.title, parent: null})
      }
    })
    categoriesJson.result.items.forEach((item) => {
      if (item.parent) {
        let index = sortedCategories.findIndex((el) => (el._id == item.parent._id && el.parent == null));
        index !== -1 && sortedCategories.splice(index + 1, 0, {_id: item._id, title: `- ${item.title}`, parent: item.parent._id})
      }
    })
    categoriesJson.result.items.forEach((item) => {
      if (item.parent) {
        let index = sortedCategories.findIndex((el) => (el._id == item.parent._id && el.parent !== null));
        index !== -1 && sortedCategories.splice(index + 1, 0, {_id: item._id, title: `- - ${item.title}`, parent: item.parent._id})
      }
    })
    this.setState({
      ...this.getState(),
      categories: [{ _id: '', title: 'Все', parent: null }, ...sortedCategories],
    }, 'Загружен список категорий из АПИ');
  }

}

export default CatalogState;
