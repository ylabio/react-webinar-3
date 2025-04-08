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
      totalItems: 0,
      currentPage: 1,
      totalPages: 1,
    };
  }

  async load(limit = 10, skip = 0, lang = 'ru') {
    const response = await fetch(
      `/api/v1/articles/?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count&lang=${lang}`,
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        totalItems: json.result.count,
        totalPages: Math.ceil(json.result.count / limit),
      },
      'Загружены товары из АПИ',
    );
  }

  setCurrentPage(currentPage = 1) {
    this.setState({
      ...this.getState(),
      currentPage,
    });
  }
}

export default Catalog;
