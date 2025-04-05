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
      totalPages: 0,
      onePagesItemSum: 5,
    };
  }

  async load() {
    const response = await fetch('/api/v1/articles?limit=10&skip=0&fields=items(_id, title, price),count');
    const json = await response.json();
    // console.log(this.getState().totalPages);
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
        totalPages: Math.round(json.result.count/this.getState().onePagesItemSum),
      },
      'Загружены товары из АПИ',
    );
    // console.log(this.getState().totalPages);
  }

  setCurrentPage(_id) {
    this.setState(
      {
        ...this.getState(),
        currentPage: _id,
      },
      'Произошла пагинация',
    );
  }
}

export default Catalog;
