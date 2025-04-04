import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      count: 0, // Общее количество товаров
      page: 1, // Текущая страница
      limit: 10, // Товаров на странице
      waiting: false, // Флаг загрузки
    };
  }

  /**
   * Загрузка товаров с пагинацией
   * @param params {object} - параметры запроса (page, limit)
   */
  async load(params = {}) {
    const newParams = {
      page: this.getState().page,
      limit: this.getState().limit,
      ...params,
    };

    this.setState(
      {
        ...this.getState(),
        ...newParams,
        waiting: true,
      },
      'Обновление параметров пагинации',
    );

    try {
      const skip = (newParams.page - 1) * newParams.limit;
      const response = await fetch(
        `/api/v1/articles?limit=${newParams.limit}&skip=${skip}&fields=items(_id,title,price),count`,
      );
      const json = await response.json();

      this.setState(
        {
          ...this.getState(),
          list: json.result.items,
          count: json.result.count || json.result.items.length,
          waiting: false,
        },
        'Загружены товары из АПИ',
      );
    } catch (e) {
      this.setState(
        {
          ...this.getState(),
          waiting: false,
        },
        'Ошибка загрузки товаров',
      );
      console.error(e);
    }
  }

  /**
   * Изменение страницы
   * @param page {number} - номер страницы
   */
  setPage(page) {
    this.load({ page });
  }

  /**
   * Изменение количества товаров на странице
   * @param limit {number} - товаров на странице
   */
  setLimit(limit) {
    this.load({ limit, page: 1 }); // При изменении лимита сбрасываем на первую страницу
  }
}

export default Catalog;
