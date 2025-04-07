import { codeGenerator } from '../../utils';
import StoreModule from '../module';
import { ROUTES_API } from '../../routes';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      currentProduct: {},
    };
  }

  async loadPage(limit = 10, skip = 0) {
    try {
      const response = await fetch(ROUTES_API.page(limit, skip));
      const json = await response.json();
      this.setState(
        {
          ...this.getState(),
          list: json.result.items,
        },
        'Загружены товары из АПИ',
      );
    } catch(e) {
      console.error(e);
    }
  }

  async setCurrentProduct(id) {
    try {
      const response = await fetch(ROUTES_API.product(id));
      const json = await response.json();
      const { title, description, edition, price, category, madeIn } = json.result;
      this.setState(
        {
          ...this.getState(),
          currentProduct: {
            ...this.currentProduct,
            id,
            title,
            description,
            edition,
            price,
            category: category.title,
            madeIn: madeIn.title,
          }
        },
        'Загружены данные о товаре',
      );
    } catch(e) {
      console.error(e);
    }
  }

}

export default Catalog;
