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
      categories: [], // Хранит все категории, полученные с Api
      count: 0,
      waiting: false,
    };
  }

  // РАБОТА С КАТЕГОРИЯМИ
  formatCategories(categories) {
    const categoriesMap = new Map();
    const tree = [];

    //Создание map коллекции всех категорий
    categories.forEach(category => {
      categoriesMap.set(category._id, { ...category, children: [] });
    })

    //Построение дерева на основе map
    categories.forEach(category => {
      const node = categoriesMap.get(category._id);
      if (node.parent) {
        const parentNode = categoriesMap.get(node.parent._id);
        parentNode.children.push(node);
      } else {
        tree.push(node);
      }
    })

    //Форматирование дерева для того, чтобы категории были вида, который можно передать в select
    const formatTree = (nodes, level = 0) => {
      let formated = [];
      nodes.forEach(node => {
        formated.push({
          value: node._id,
          title: `${'-'.repeat(level)} ${node.title}`
        })
        formated = formated.concat(formatTree(node.children, level + 1));
      })
      return formated;
    }

    return formatTree(tree);
  }

  async getCategories() {
    try {
      const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
      const data = await response.json();
      const formatedCategories = this.formatCategories(data.result.items);

      this.setState({
        ...this.getState(),
        categories: [{ value: '', title: 'Все' }, ...formatedCategories],
      }, 'Загружен список категорий')
    } catch (error) {
      console.log(error)
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
    if (urlParams.has('limit'))
      validParams.limit = Math.min(Number(urlParams.get('limit')) || 10, 50);
    if (urlParams.has('sort')) validParams.sort = urlParams.get('sort');
    if (urlParams.has('query')) validParams.query = urlParams.get('query');
    if (urlParams.has('category')) validParams.category = urlParams.get('category');
    await this.setParams({ ...this.initState().params, ...validParams, ...newParams }, true);
    await this.getCategories();
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

    const urlParams = new URLSearchParams(params);

    // Обрабатываем category для URL
    if (params.category) {
      urlParams.set('search[category]', params.category);
    } else {
      urlParams.delete('search[category]'); //  Удаляем параметр из URL, если категория пуста
    }

    // Сохранить параметры в адрес страницы
    let urlSearch = urlParams.toString();

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

    if (params.category) apiParams['search[category]'] = params.category;

    const response = await fetch(`/api/v1/articles?${new URLSearchParams(apiParams)}`);
    const json = await response.json();
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
