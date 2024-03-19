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
        category: '',
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
    await this.fetchCategories();
    const urlParams = new URLSearchParams(window.location.search);
    let validParams = {};
    if (urlParams.has('page')) validParams.page = Number(urlParams.get('page')) || 1;
    if (urlParams.has('limit')) validParams.limit = Math.min(Number(urlParams.get('limit')) || 10, 50);
    if (urlParams.has('sort')) validParams.sort = urlParams.get('sort');
    if (urlParams.has('category')) validParams.category = urlParams.get('category');
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

    const apiParams = {
      limit: params.limit,
      skip: (params.page - 1) * params.limit,
      fields: 'items(*),count',
      sort: params.sort,
      ...(params.query && { 'search[query]': params.query } ),
      ...(params.category && { 'search[category]': params.category } ),
    };

    const response = await fetch(`/api/v1/articles?${new URLSearchParams(apiParams)}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count,
      waiting: false
    }, 'Загружен список товаров из АПИ');
  }

  async fetchCategories() {
    const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
    const json = await response.json();
    this.setState({
      ...this.getState(),
      categories: this.#parseCategories(json.result.items),
    }, 'Загружен список категорий');
  }

  #parseCategories(categories) {
    return [{value: "", title: "Все"}, ...this.#generateCategoryNames(categories)];
  }

  #generateTree(items) {
    let tree = [];
    let mappedItems = {};
    let item;
    let mappedItem;

    for (let i = 0, len = items.length; i < len; i++) {
      item = items[i];
      mappedItems[item._id] = item;
      mappedItems[item._id]['children'] = [];
    }

    for (let id in mappedItems) {
      if (mappedItems.hasOwnProperty(id)) {
        mappedItem = mappedItems[id];
        if (mappedItem.parent) {
          mappedItems[mappedItem.parent._id]['children'].push(mappedItem);
        }
        else {
          tree.push(mappedItem);
        }
      }
    }
    return tree;
  }

  #generateCategoryNames(categories) {
    const tree = this.#generateTree(categories);

    let visited = [];

    let traverse = (prefix, node) => {
      visited.push({value: node._id, title: `${prefix}${node.title}`});
      if (node.children) {
        prefix = `- ${prefix}`;
        for (let child of node.children) {
          traverse(prefix, child);
        }
      }
    }

    tree.forEach(branch => traverse("", branch));
    return visited;
  }

  #addSpaces(title, parent, categories) {
    if (parent) {
      title = `- ${title}`;
      title = this.#addSpaces(title, categories.find(c => c._id === parent._id).parent, categories);
    }
    return title;
  }
}

export default CatalogState;
