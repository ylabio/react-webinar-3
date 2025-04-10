import StoreModule from '../module';
import {createCategoryList, createCategoryQuery, createCategoryTree} from "../../utils";
import { DEFAULT_CATEGORY } from '../../constants';
import CategorySelect from '../../components/category-select';

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
      categoriesList: [],
      defaultCategory: { ...DEFAULT_CATEGORY },
      params: {
        page: 1,
        limit: 10,
        sort: 'order',
        category: '',
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
    await this.initCategory();

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

    const apiParams = this.setApiParams(params);

    const response = await fetch(`/api/v1/articles?${new URLSearchParams(apiParams)}&lang=ru`);
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

  setCurrentCategory(currentCategory) {
    this.setState({
      ...this.getState(),
      defaultCategory: { ...currentCategory },
    });
  }

  async initCategory() {
    const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*&lang=ru');

    if (response && response.ok) {
      const json = await response.json();
      this.setState({
        ...this.getState(),
        categoriesList: createCategoryList(json.result.items),
      });
    }
  }

  setApiParams(params = {}) {
    const currentCategory = !!params.category
      ? this.getState().categoriesList.find(elem => elem._id === params.category)
      : { ...DEFAULT_CATEGORY };
    this.setCurrentCategory(currentCategory);
    if (!!params.category) {
      const categoryRequestQuery = createCategoryQuery(
        this.getState().categoriesList,
        params.category,
      );
      return {
        limit: params.limit,
        skip: (params.page - 1) * params.limit,
        fields: 'items(*),count',
        sort: params.sort,
        'search[category]': categoryRequestQuery,
        'search[query]': params.query,
      };
    }
    return {
      limit: params.limit,
      skip: (params.page - 1) * params.limit,
      fields: 'items(*),count',
      sort: params.sort,
      'search[query]': params.query,
    };
  }
}

export default CatalogState;
