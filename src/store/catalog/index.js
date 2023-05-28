import {codeGenerator} from "../../utils";
import StoreModule from "../module";
import Page from "../page";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: []
    }
  }

  async load() {
    const response = await fetch(`/api/v1/articles?limit=${this.store.state.page.limit}&skip=${this.store.state.page.skip}&fields=items(_id, title, price),count`);
    const json = await response.json();
    
    const page = this.store.actions.page
    page.setState({
      ...page.getState(),
      count: json.result.count,
    }, 'Обновление общей длинны списка')

    this.setState({
      ...this.getState(),
      list: json.result.items,
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
