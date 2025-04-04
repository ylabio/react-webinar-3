import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
    this.catalogSizes = [5, 10, 20];
  }

  initState() {
    return {
      list: [],
      page: 1,
      quantity: 10,
      availableQuantitys: this.catalogSizes,
    };
  }

  async load(page = this.getState().page, quantity = this.getState().quantity) {
    const skip = page > 0 ? (page - 1) * quantity : 0;
    const response = await fetch(`/api/v1/articles?limit=${quantity}&skip=${skip}`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        page,
        quantity,
      },
      'Загружены товары из АПИ',
    );
  }

  setPage(page) {
    this.setState(
      {
        ...this.getState(),
        page,
      },
      'Изменение страницы',
    );
    this.load(page, this.getState().quantity);
  }

  setQuantity(quantity) {
    this.setState(
      {
        ...this.getState(),
        quantity,
        page: 1,
      },
      'Изменение количества элементов',
    );
    this.load(1, quantity);
  }
}

export default Catalog;
