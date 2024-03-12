import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      page: 0,
      totalAmount: 0
    }
  }

  async load(page = 0) {
    const host = '/api/v1/articles';
    const url = `${host}?limit=10&skip=${page * 10}`

    const response = await fetch(url);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items
    }, 'Загружены товары из АПИ');
  }

  setPage(page) {
    this.setState({
      ...this.getState(),
      page: page,
    }, 'Изменена текущая страница')
  }

  async loadTotalAmount() {
    const response = await fetch('/api/v1/articles?limit=*&fields=items(_id)');
    const json = await response.json();
    this.setState({
      ...this.getState(),
      totalAmount: json.result.items.length
    }, 'Загружено общее количество товаров из АПИ');
  }
}

export default Catalog;
