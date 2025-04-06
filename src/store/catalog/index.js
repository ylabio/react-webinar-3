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
      limit: 10,
      skip: 0,
      productsAmount: 0,
    };
  }

  async load() {
    const response = await fetch(`/api/v1/articles?limit=${this.getState().limit}&skip=${this.getState().skip}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        productsAmount: json.result.count,
      },
      'Загружены товары из АПИ',
    );
  }

  async setLimit(newValue) {
    this.setState( {
      ...this.getState(),
      limit: newValue
    } , 'Изменен limit');

    await this.load();
  }

  async setSkip(newValue) {
    this.setState( {
      ...this.getState(),
      skip: newValue
    }, 'Изменен skip');

    await this.load();
  }
}

export default Catalog;
