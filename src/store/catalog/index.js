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
        sort: 'order',
        query: '',
      },
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
        // Проверяем и сохраняем параметры из URL
        if (urlParams.has('page')) validParams.page = Number(urlParams.get('page')) || 1;
        if (urlParams.has('limit')) validParams.limit = Math.min(Number(urlParams.get('limit')) || 10, 50);
        if (urlParams.has('sort')) validParams.sort = urlParams.get('sort');
        if (urlParams.has('query')) validParams.query = urlParams.get('query');
        if (urlParams.has('search[category]')) validParams['search[category]'] = urlParams.get('search[category]');

        // Загрузка категорий
        const categoriesResponse = await fetch('/api/v1//categories?fields=_id,title,parent(_id)&limit=*');
        const categoriesJson = await categoriesResponse.json();
        const categories = Array.isArray(categoriesJson.result.items) ? categoriesJson.result.items : [];

        categories.unshift({
            _id: null,
            title: 'Все',
        });
        this.setState({
            ...this.getState(),
            categories: categories.map(cat => ({
                value: cat._id,
                title: cat.title,
                parent: cat.parent ? cat.parent._id : null
            })),
        });
        await this.setParams({ ...this.initState().params, ...validParams, ...newParams }, true);
    }

  /**
   * Сброс параметров к начальным
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
    async resetParams(newParams = {}) {
        const params = {
            ...this.initState().params,
            'search[category]': null,
            ...newParams
        };
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
        if (params.query === '') {
            delete params.query;
        }
      if (params['search[category]'] === '' || params['search[category]'] === 'Все' || params['search[category]'] === null) {
          delete params['search[category]'];
      }

        // Обновляем состояние перед запросом к API
        this.setState({
            ...this.getState(),
            params,
            waiting: true
        }, 'Установлены параметры каталога');

        // Обновляем URL с учётом новых параметров
        let urlSearch = new URLSearchParams(params).toString();
        const url = window.location.pathname + '?' + urlSearch + window.location.hash;
        if (replaceHistory) {
            window.history.replaceState({}, '', url);
        } else {
            window.history.pushState({}, '', url);
        }

        // Формируем параметры для запроса к API
        const apiParams = {
            limit: params.limit,
            skip: (params.page - 1) * params.limit,
            sort: params.sort,
            fields: 'items(*),count',
        };

        // Добавляем параметр query, если он есть
        if (params.query) {
            apiParams['search[query]'] = params.query;
        }

        // Добавляем параметр search[category], если он есть
        if (params['search[category]']) {
            apiParams['search[category]'] = params['search[category]'];
        }

        // Отправляем запрос к API
        const response = await fetch(`/api/v1/articles?${new URLSearchParams(apiParams)}`);
        const json = await response.json();

        // Обновляем состояние после получения ответа от API
        this.setState({
            ...this.getState(),
            list: json.result.items,
            count: json.result.count,
            waiting: false
        }, 'Загружен список товаров из АПИ');
    }
}

export default CatalogState;
