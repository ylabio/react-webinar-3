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
      totalItem: 0,
      page: 1,
      limit: 10,
      item: null,
    };
  }
  async loadTotalItemCount() {
    const response = await fetch(`/api/v1/articles?fields=items(),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      totalItem: json.result.count,
    });
  }

  async load(params = {}) {
    const {
      page = this.store.getState().catalog.page,
      limit = this.store.getState().catalog.limit,
    } = params;
    const skip = (page - 1) * limit;
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        page,
      },
      'Загружены товары из АПИ',
    );
  }
  changeLimit(newLimit) {
    this.setState({ ...this.getState(), limit: newLimit });
  }

  async loadItemById(id) {
    const response = await fetch(
      `/api/v1/articles/${id}?fields=title,description,price,edition,madeIn(title,code),category(title)`,
    );
    const json = await response.json();
    this.setState({
      ...this.getState(),
      item: json.result || null,
    });
  }
}

export default Catalog;
