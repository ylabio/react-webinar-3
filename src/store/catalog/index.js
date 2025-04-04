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
      total: 0,
    };
  }

  async load() {
    const response = await fetch(`/api/v1/articles`);
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        total: json.result.items.length,
      },
      'Загружены товары из АПИ',
    );
  }
  async loadFields({ fields = '' } = {}) {
    const safeFields = fields || 'items()';

    const response = await fetch(`/api/v1/articles?fields=${safeFields},count`);
    const json = await response.json();
    
    this.setState(
      {
        ...this.getState(),
        total: json.result.count,
      },
      'Загружены товары из АПИ с полями fields',
    );
  }
  async loadParams({ skip = 0, limit = 0 }) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}`);
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      'Загружены товары из АПИ с параметрами limit skip',
    );
  }
}

export default Catalog;
