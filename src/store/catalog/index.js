import { codeGenerator } from '../../utils';
import { DEFAULT_QUERY } from '../../query/constants';

import StoreModule from '../module';
import { LOCAL_STORAGE_KEY } from '../../constants';

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
    };
  }

  async load() {
    const { itemsPerPage, currentPage } = this.getState();

    const localeStoreData = localStorage.getItem(LOCAL_STORAGE_KEY);

    const data = JSON.parse(localeStoreData);

    if (!data) {
      await this.fetchData(itemsPerPage, currentPage);
    } else {
      const { userItemsPerPage, userCurrentPage } = data;
      await this.fetchData(userItemsPerPage, userCurrentPage);
    }
  }

  async updateProductData(limit = 10, page = 1) {

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ userItemsPerPage: limit, userCurrentPage: page }),
    );

    await this.fetchData(limit, page);
  }

  async fetchData(limit = 10, page = 1) {
    const skip = limit * (page - 1);

    const response = await fetch(
      `${DEFAULT_QUERY}?limit=${limit}&lang=ru&skip=${skip}&fields=items(_id,title,price),count`,
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        allItemsCount: json.result.count,
        currentPage: page,
        itemsPerPage: limit,
      },
      'Обновлены товары из АПИ',
    );
  }
}

export default Catalog;
