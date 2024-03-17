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
        category: 'Все',
        sort: 'order',
        query: '',
      },
      count: 0,
      waiting: false,
      categories: [{_id: '0', title: 'Все', value: 'Все', parent: null}],
      sortedCategories: [],
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
    // if (urlParams.has('fields')) validParams.query = urlParams.get('fields');
    if (urlParams.has('category')) validParams.category = urlParams.get('category');
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

    const categoryId = this.findCategoryIdByTitle(params.category);

    const apiParams = {
      limit: params.limit,
      skip: (params.page - 1) * params.limit,
      fields: `items(*),count,category(*)`,
      sort: params.sort,
      'search[query]': params.query,
    } ;

    if (params.category !== 'Все')  apiParams['search[category]'] = categoryId;

    const response = await fetch(`/api/v1/articles?${new URLSearchParams(apiParams)}`);
    const json = await response.json();
    const list = json.result.items;

    this.setState({
      ...this.getState(),
      list: list,
      count: json.result.count,
      waiting: false
    }, 'Загружен список товаров из АПИ');
  }

  async getCategories() {
    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      categories: this.formatCategories(json),
    }, 'Загружен список категорий из АПИ');
    return this.getState().categories;
  }

  formatCategories(json){
    const categories = [...this.getState().categories, ...json.result.items.map(category=> ({...category, value: category.title}))];
    this.getSubCategories(categories);
     return this.getState().sortedCategories;
  }

  findCategoryIdByTitle(value){
    let id;
    const category = this.getState().categories.filter(category=> category.value === value);
    if(category.length) id = category[0]._id;
    return id ;
  }

  getSubCategories(categories, parentId = null, count = 0) {
     //todo порядок вложенности, дефис
    const childs = categories.filter(category=> (parentId === null || category.parent === null) ? category.parent === parentId : category.parent._id === parentId);

    const sortedCategories = childs.map(category => {

    const child = ({
      ...category,
      subCategory: this.getSubCategories(categories, category._id, count++),
      title: parentId === null ? category.title : `${' - '.repeat(count)}${category.title}`,
    })

    this.getState().sortedCategories.push(child);
    return child;
    });
      return sortedCategories;
    }
}

export default CatalogState;
