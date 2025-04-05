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
      count: 0,
      selectedProduct: null,
    };
  }

  async load(limit, skip) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result?.items,
        count: json.result?.count,
      },
      'Загружены товары из АПИ',
    );
  }

  async getProduct(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=description,edition,price,title,madeIn(title),category(title)`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        selectedProduct: json.result,
      }
    );
  };
}

export default Catalog;
