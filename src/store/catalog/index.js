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
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 0,
      loading: false,
      error: null,
    };
  }
  async load(page = 1) {
    const limit = this.getState().itemsPerPage;
    const skip = (page - 1) * limit;

    this.setState(
      {
        ...this.getState(),
        loading: true,
        error: null,
      },
      'Начинаем загрузку товаров',
    );

    try {
      const response = await fetch(
        `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`,
      );

      if (!response.ok) {
        throw new Error('Ошибка при загрузке товаров');
      }

      const json = await response.json();

      this.setState(
        {
          ...this.getState(),
          list: json.result.items,
          totalItems: json.result.count,
          currentPage: page,
          loading: false,
        },
        'Товары успешно загружены',
      );
    } catch (error) {
      this.setState(
        {
          ...this.getState(),
          loading: false,
          error: 'Ошибка при загрузке товаров',
        },
        'Ошибка при загрузке товаров',
      );
    }
  }

  changeItemsPerPage(itemsPerPage) {
    this.setState(
      {
        ...this.getState(),
        itemsPerPage,
        currentPage: 1,
      },
      'Изменено количество элементов на странице',
    );
    this.load(1);
  }
}

export default Catalog;
