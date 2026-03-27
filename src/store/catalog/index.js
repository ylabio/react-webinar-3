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
      params: {
        page: 1,
        limit: 10,
        category: [],
        sort: 'order',
        query: '',
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
    if (urlParams.has('page')) validParams.page = Number(urlParams.get('page')) || 1;
    if (urlParams.has('limit')) validParams.limit = Math.min(Number(urlParams.get('limit')) || 10, 50);
    if (urlParams.has('sort')) validParams.sort = urlParams.get('sort');
    if (urlParams.has('search[category]')) {
      validParams.category = urlParams.getAll('search[category]');
    }
    if (urlParams.has('query')) validParams.query = urlParams.get('query');
    await this.setParams({ ...this.initState().params, ...validParams, ...newParams }, true);
  }

  /**
   * Сброс параметров.
   */
  async resetParams(newParams = {}) {
    const params = { ...this.initState().params, ...newParams };
    await this.setParams(params);
  }

  /**
   * Установка параметров с сохранением в URL.
   */
  async setParams(newParams = {}, replaceHistory = false) {
    const prevCategory = this.getState().params.category;

    const params = { ...this.getState().params, ...newParams, category: newParams.category || prevCategory };
    console.log('Setting params:', params);

    this.setState(
      { ...this.getState(), params, waiting: true },
      'Установлены параметры каталога'
    );

    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('page', params.page);
    urlSearchParams.set('limit', params.limit);
    urlSearchParams.set('sort', params.sort);

    if (params.query) {
      urlSearchParams.set('query', params.query);
    }
    if (Array.isArray(params.category)) {
      params.category.forEach(cat => urlSearchParams.append('search[category]', cat));
    }
  
    const url = window.location.pathname + '?' + urlSearchParams.toString() + window.location.hash;
    replaceHistory ? window.history.replaceState({}, '', url) : window.history.pushState({}, '', url);
  
    const apiParams = {
      limit: params.limit,
      skip: (params.page - 1) * params.limit,
      fields: 'items(*),count',
      ...(params.category.length && { 'search[category]': params.category }),
      sort: params.sort,
      'search[query]': params.query,
    };
    
    const response = await fetch(`/api/v1/articles?${new URLSearchParams(apiParams)}`);
    const json = await response.json();

    this.setState(
      { ...this.getState(), list: json.result.items, count: json.result.count, waiting: false },
      'Загружен список товаров из АПИ'
    );
  }
}

export default CatalogState;
