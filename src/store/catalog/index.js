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
      totalItems: 0,
      currentPage: 1,
    };
  }

  async load({ limit = 10, skip = 0, language }) {
    const response = await getCatalog({ limit, skip, language });
    this.setState(
      {
        ...this.getState(),
        list: response.result.items,
        totalItems: response.result.count,
      },
      'Загружены товары из АПИ',
    );
  }

  changePage(page) {
    this.setState(
      {
        ...this.getState(),
        currentPage: page,
      },
      `Переход на страницу ${page}`,
    );
  }
}

export default Catalog;
