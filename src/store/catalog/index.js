import { codeGenerator, generatePagesArray } from '../../utils';
import { DEFAULT_QUERY } from '../../query/constants';

import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      itemsPerPage: 10,
      currentPage: 1,
      itemsCount: 0,
      pageItemsCountArray: [5, 10, 20],
      isBadRequest: false,
      isLoading: true,
    };
  }

  async load() {
    const { itemsPerPage, currentPage } = this.getState();
    this.setState({
      ...this.getState(),
      isLoading: true,
    });
    await this.fetchData(itemsPerPage, currentPage);
  }

  async updateProductData(limit = 10, page = 1) {
    this.setState({
      ...this.getState(),
      currentPage: page,
      itemsPerPage: limit,
      isLoading: true,
    });


    await this.fetchData(limit, page);
  }

  async fetchData(limit = 10, page = 1) {
    const skip = limit * (page - 1);

    const response = await fetch(
      `${DEFAULT_QUERY}?limit=${limit}&lang=ru&skip=${skip}&fields=items(_id, title,price),count`,
    );
    if(response.ok) {
      const json = await response.json();
      this.setState(
        {
          ...this.getState(),
          list: json.result.items,
          allItemsCount: json.result.count,
          isBadRequest: false,
          isLoading: false,
        },
        'Обновлены товары из АПИ',
      );
    } else {
      this.setState({
        ...this.getState(),
        isLoading: true,
      });
    }


  }
}

export default Catalog;
