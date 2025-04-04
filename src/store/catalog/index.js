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
      activePage: 1,
      count: 0,
      limit: 10,
    };
  }

  async load(page = 1) {
    const limit = this.getState().limit;
    const skip = (page - 1) * limit;
    const response = await fetch(
      `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`,
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
        activePage: page,
      },
      'Загружены товары из АПИ',
    );
  }

  changeLimit(limit = 10) {
    this.setState({
      ...this.getState(),
      limit: limit,
    });

    this.load()
  }
}

export default Catalog;
