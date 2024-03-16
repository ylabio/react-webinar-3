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
        filter: 'Все',
        sort: 'order',
        query: '',
      },
      count: 0,
      waiting: false,
      // categories: [{value: 'all', title: 'Все', id: '0'}],
      categories: [{_id: '0', title: 'Все', parent: null}],
      categoryId: 0,
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

    // if (urlParams.has('filter') && urlParams.get('filter') !== 'Все') {
    //   validParams.limit = '*';
    //   validParams.page = 1;
    // }


    if (urlParams.has('sort')) validParams.sort = urlParams.get('sort');
    if (urlParams.has('query')) validParams.query = urlParams.get('query');

    if (urlParams.has('filter')) validParams.filter = urlParams.get('filter');
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

    const apiParams = (params.filter == 'Все') ? {
      // limit: params.filter == '0' ? params.limit : '*',
      // page: params.filter == '0' ? params.page : 1,
      limit: params.limit,
      skip: (params.page - 1) * params.limit,
      fields: `items(*),count,category(title)`,
      // fields: 'items(*),count',
      sort: params.sort,
      'search[query]': params.query
    } : {
      page: 1,
      limit: '*',
      skip: 10,
      fields: `items(*),count,category(title)`,
      sort: params.sort,
      'search[query]': params.query
    };

    // const apiParamsForGetAllItems = {
    //   page: 1,
    //   limit: "*",
    //   fields: `items(*),count,category(title)`,
    // };

    const categoryId = this.findCategoryIdByTitle(params.filter);

    const response = await fetch(`/api/v1/articles?${new URLSearchParams(apiParams)}`);
    const json = await response.json();
    const list = (!params.filter || params.filter == 'Все') ? json.result.items : json.result.items.filter(el=> el.category._id == categoryId);

    this.setState({
      ...this.getState(),
      // list: json.result.items,
      // list: params.filter === '0' ? json.result.items : json.result.items.filter(el=> el.category._id === params.filter),
      list: list,
      // list: json.result.items,
      // count: json.result.count,
      count: (!params.filter || params.filter == 'Все') ? json.result.count : list.length,
      waiting: false
    }, 'Загружен список товаров из АПИ');
    console.log('this.getState().list', this.getState().list);
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
    // categories: [...this.getState().categories, ...json.result.items.map((category)=>({value: category.title, title: category.title, id: category._id}))],
    const categories = [...this.getState().categories, ...json.result.items.map(category=> ({...category, value: category.title}))];
    console.log('categories', categories);
    console.log('this.sortCategories(categories)', this.sortCategories(categories));
    return categories;
    // return this.sortCategories(categories);
  }

  findCategoryIdByTitle(title){
    let id;
    const category = this.getState().categories.filter(category=> category.title === title);
    if(category.length) id = category[0]._id;
    return id ;
  }

  sortCategories(categories, parentId = null) {
    console.log('parentId', parentId);
    const parents = categories.filter(category=> (parentId === null || category.parent === null) ? category.parent == parentId : category.parent._id == parentId );
    // const parents = categories.filter(category=> category.parent == parentId);
    console.log('parents', parents);

    const sortedCategories = parents.map(category => ({
        ...category,
        subCategory: this.sortCategories(categories, category._id)
      }));
      // console.log('sortedCategories', sortedCategories);
      return sortedCategories;
    }
  // renderCategories(){

  // }
}

export default CatalogState;
