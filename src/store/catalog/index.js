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
      article: {},
    };
  }

  async load() {
    const response = await fetch('/api/v1/articles');
    const json = await response.json();
    console.log(json);

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      'Загружены товары из АПИ',
    );
  }

  async loadId(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=%2A&lang=ru`);
    const json = await response.json();
    console.log(json);

    this.setState(
      {
        ...this.getState(),
        article: json.result,
      },
      'Загружен товар по id',
    );
  }
}

export default Catalog;
