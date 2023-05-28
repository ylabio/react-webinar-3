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
      pagesCount: null,
    };
  }

  async load(activePage) {
    const response = await fetch(
      `/api/v1/articles?limit=10&skip=${
        activePage * 10 - 10
      }&fields=items(_id, title, price),count`
    );
    const json = await response.json();
    const pagesCount = Math.ceil(json.result.count / 10);

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        pagesCount,
      },
      'Загружены товары из АПИ'
    );
  }

  changePage(activePage) {
    if (this.getState().activePage === activePage) return;
    this.setState({ ...this.getState(), activePage });
    this.load(activePage);
  }
}

export default Catalog;
