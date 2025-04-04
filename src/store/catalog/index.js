import { codeGenerator } from '../../utils';
import StoreModule from '../module';
import { getCatalog } from '../../app/api/api';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
    };
  }

  async load({ limit = 10, skip = 0 }) {
    const response = await getCatalog({ limit, skip });
    this.setState(
      {
        ...this.getState(),
        list: response.result.items,
        totalItems: response.result.count,
      },
      'Загружены товары из АПИ',
    );
  }
}

export default Catalog;
