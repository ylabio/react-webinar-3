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
        sort: 'order',
        query: '',
        category: '',
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
    const params = { ...this.getState().params, ...newParams };

    // Установка новых параметров и признака загрузки
    this.setState(
      {
        ...this.getState(),
        params,
        waiting: true,
      },
      'Установлены параметры каталога',
    );

    const updateUrl = (replace) => {
      const currentParams = this.getState().params;
      const urlSearch = new URLSearchParams(currentParams).toString();
      const url = window.location.pathname + '?' + urlSearch + window.location.hash;
      if (replace) {
        window.history.replaceState({}, '', url);
      } else {
        window.history.pushState({}, '', url);
      }
    };

    // Сохранить параметры в адрес страницы
    updateUrl(replaceHistory);

    const fetchArticles = async () => {
      const currentParams = this.getState().params;
      const apiParams = {
        limit: currentParams.limit,
        skip: (currentParams.page - 1) * currentParams.limit,
        fields: 'items(*,category(_id, title)),count',
        sort: currentParams.sort,
        'search[query]': currentParams.query,
      };

      if (currentParams.category && currentParams.category !== '') {
        apiParams['search[category]'] = currentParams.category;
      }

      const response = await fetch(`/api/v1/articles?${new URLSearchParams(apiParams)}`);
      return await response.json();
    };

    // Первичный запрос на сервер
    let json = await fetchArticles();

    const currentParams = this.getState().params;
    const skip = (currentParams.page - 1) * currentParams.limit;

    // Сделать новый запрос если смещение больше текущего размера выборки
    if (json.result.count <= skip && json.result.count > 0) {
      //Считаю какая должна быть последняя страница
      const lastPage = Math.max(1, Math.ceil(json.result.count / currentParams.limit));

      // Установка новых параметров
      this.setState(
        {
          ...this.getState(),
          params: {
            ...this.getState().params,
            page: lastPage,
          },
        },
        'При превышении смещения перешли на последнюю страницу',
      );

      // Замена параметров в адресе страницы
      updateUrl(true);

      // Повторный запрос на сервер
      json = await fetchArticles();
    }

    // Устанавливаем полученные данные
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
        waiting: false,
      },
      'Загружен список товаров из АПИ',
    );
  }
}

export default CatalogState;
