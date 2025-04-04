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
      page: 1,
      allPages: Array.from({length: 25}, (_, i) => i + 1),
      allLimits: [5, 10, 20],
      limit: 10,
    };
  }

  turnPage(pageNum) {
    this.setState({
      ...this.getState(),
      page: pageNum,
    })
  }

  setLimit(limitNum) {
    this.setState({
      ...this.getState(),
      limit: limitNum,
    })
  }

  async load() {
    const limit = this.getState().limit;
    const skip = (this.getState().page - 1) * limit;
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      'Загружены товары из АПИ',
    );
  }
}

export default Catalog;
