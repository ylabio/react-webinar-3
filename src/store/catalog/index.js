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
      total: 0,
      currentPage: 1,
      itemsPerPage: 10,
      itemsPerPageOptions: [5, 10, 20],
    };
  }

  async load(page = 1, itemsPerPage = 10) {
    const skip = (page - 1) * itemsPerPage;
    const response = await fetch(
      `/api/v1/articles?limit=${itemsPerPage}&skip=${skip}&fields=items(_id,title,price),count`,
    );
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        total: json.result.count,
        currentPage: page,
        itemsPerPage,
      },
      'Загружены товары из АПИ',
    );
  }

  setItemsPerPage(value) {
    this.load(1, value);
  }

  setPage(page) {
    this.load(page, this.getState().itemsPerPage);
  }
}

export default Catalog;
