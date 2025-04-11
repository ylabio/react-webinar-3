import StoreModule from '../module';

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CatalogState extends StoreModule {
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
      categories: [],
      waiting: false,
      getPageTitle: this.getPageTitle.bind(this),
    };
  }

  async loadCategories() {
    try {
      const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
      const data = await response.json();
      const formattedCategories = this.formatCategories(data.result?.items || []);
      this.setState(
        {
          ...this.getState(),
          categories: [{ value: '', title: 'Все' }, ...formattedCategories],
        },
        'Категории загружены',
      );
    } catch (error) {
      console.error('Ошибка при загрузке категорий:', error);
    }
  }

  formatCategories(categories) {
    const map = {};
    categories.forEach(category => {
      map[category._id] = { ...category, children: [] };
    });

    const rootCategories = [];
    categories.forEach(category => {
      if (category.parent) {
        const parentId = category.parent._id;
        if (map[parentId]) {
          map[parentId].children.push(map[category._id]);
        }
      } else {
        rootCategories.push(map[category._id]);
      }
    });

    const buildOptions = (categories, prefix = '') =>
      categories.flatMap(category => [
        { value: category._id, title: `${prefix}${category.title}` },
        ...buildOptions(category.children, `${prefix}- `),
      ]);

    return buildOptions(rootCategories);
  }

  getPageTitle() {
    const { params, categories } = this.getState();
    if (!Array.isArray(categories) || categories.length === 0) {
      return '';
    }
    const selectedCategory = categories.find(cat => cat.value === params.category);
    if (!params.category) {
      return '';
    }
    const cleanCategoryTitle = selectedCategory?.title.replace(/-\s*/g, '');

    return cleanCategoryTitle || '';
  }

  /**
   * Инициализация параметров из URL
   */
  initParams(newParams = {}) {
    const urlParams = new URLSearchParams(window.location.search);
    const validParams = {};
    ['page', 'limit', 'sort', 'query', 'category'].forEach(key => {
      if (urlParams.has(key)) {
        validParams[key] =
          key === 'page' || key === 'limit' ? Number(urlParams.get(key)) : urlParams.get(key);
      }
    });

    this.loadCategories();

    this.setParams({ ...this.initState().params, ...validParams, ...newParams }, true);
  }

  /**
   * Сброс параметров к начальным
   */
  resetParams(newParams = {}) {
    this.setParams({ ...this.initState().params, ...newParams });
  }

  /**
   * Установка параметров и загрузка списка товаров
   */
  async setParams(newParams = {}, replaceHistory = false) {
    const params = { ...this.getState().params, ...newParams };

    if ('category' in newParams) params.page = 1;

    this.setState({ ...this.getState(), params, waiting: true }, 'Установлены параметры каталога');

    const urlSearch = new URLSearchParams(params).toString();
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
      ...(params.category && { 'search[category]': params.category }),
    };

    try {
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
    } catch (error) {
      console.error('Ошибка при загрузке товаров:', error);
      this.setState({ waiting: false }, 'Ошибка при загрузке товаров');
    }
  }
}

export default CatalogState;
