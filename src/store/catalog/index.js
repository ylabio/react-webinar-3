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
      currentPage: 1,
      limit: 10,
    };
  }

  async load() {
    const { currentPage, limit } = this.getState();
    const skip = (currentPage - 1) * limit;
    try {
      const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`);
      const json = await response.json();
      this.setState(
        {
          ...this.getState(),
          list: json.result.items,
          count: Number(json.result.count)
        },
        'Загружены товары из АПИ',
      );
    } catch (error) {
      console.error(error.message);
    }
  }

  onPageChange = (page) => {
    this.setState(
      {
        ...this.getState(),
        currentPage: page
      }
    )
    this.load();
  };

  onChangeLimit = (limit) => {
    this.setState(
      {
        ...this.getState(),
        limit,
        currentPage: 1
      }
    )
    this.load();
  };
}

export default Catalog;
