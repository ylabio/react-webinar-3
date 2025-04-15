import StoreModule from '../module';
import { memo, useEffect } from 'react';

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
      categoriesLoading: false,
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
      'search[query]': params.query,
    };
    // Добавляем параметр категории в запрос, если он есть
    if (params.category) {
      apiParams['search[category]'] = params.category;
    }

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

  /**
   * Загрузка категорий
   * @return {Promise<void>}
   */
  async loadCategories() {
    this.setState({ ...this.getState(), categoriesLoading: true });

    try {
      const response = await fetch('/api/v1/categories?fields=items(_id,title,parent)&limit=*');
      const data = await response.json();

      console.log('>> Сырые категории:', data.result.items);

      const normalized = data.result.items.map(cat => ({
        ...cat,
        parent: cat.parent?._id || cat.parent || null,
      }));

      const formatted = this.formatCategories(normalized);

      this.setState({
        ...this.getState(),
        categories: formatted,
        categoriesLoading: false,
      });
    } catch (e) {
      console.error('Ошибка загрузки категорий:', e);
      this.setState({
        ...this.getState(),
        categories: [{ value: '', title: 'Все', level: 0 }],
        categoriesLoading: false,
      });
    }
  }

  /**
   * Форматирование категорий в плоский список с иерархией,
   * устойчивый к произвольному порядку элементов.
   */
  formatCategories(categories) {
    // 1. Создаем узлы и карту
    const nodes = categories.map(cat => ({
      _id: cat._id,
      title: cat.title,
      parent: cat.parent?._id || cat.parent || null,
      children: [],
      level: -1,
    }));

    const nodeMap = new Map(nodes.map(node => [node._id, node]));

    // 2. Строим связи (максимум 100 итераций для сложных случаев)
    for (let i = 0; i < 100; i++) {
      let linked = false;
      nodes.forEach(node => {
        if (
          node.parent &&
          nodeMap.has(node.parent) &&
          !nodeMap.get(node.parent).children.some(c => c._id === node._id)
        ) {
          nodeMap.get(node.parent).children.push(node);
          linked = true;
        }
      });
      if (!linked) break;
    }

    // 3. Вычисляем уровни и собираем результат
    const result = [];

    const processNode = (node, level = 0) => {
      node.level = level;
      result.push({
        value: node._id,
        title: (level ? '- '.repeat(level) : '') + node.title,
        level,
      });
      node.children
        .sort((a, b) => a.title.localeCompare(b.title))
        .forEach(child => processNode(child, level + 1));
    };

    // Обрабатываем корневые и потерянные узлы
    nodes
      .filter(node => !node.parent || !nodeMap.has(node.parent))
      .forEach(root => processNode(root));

    // Добавляем "Все" в начало
    return [{ value: '', title: 'Все', level: 0 }, ...result];
  }
}

export default CatalogState;
