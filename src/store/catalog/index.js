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
      count: null
    }
  }

  async load(firsPageIndex) {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${firsPageIndex}&fields=items(_id, title, price),count`);
    const json = await response.json();

    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count
    }, 'Загружены товары из АПИ');
  }

  async loadItem(idItem) {
    const response = await fetch(`api/v1/articles/${idItem}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();

    this.setState({
      ...this.getState(),
      item: json.result
    }, 'Загружены данные товара из АПИ')
  }
}

export default Catalog;
