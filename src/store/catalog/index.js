import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
    this.limit = 10; // кол-во элементов на странице
  }

  initState() {
    return {
      list: [],
      count: 0,
      currentPage: 1, // текущая страница
    }
  }

  async load() {
    const response = await fetch(`/api/v1/articles?limit=${this.limit}&skip=${(this.getState().currentPage - 1) * this.limit}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
       ...this.getState(),
       list: json.result.items,
       count: json.result.count,
       totalPages: Math.ceil(json.result.count/this.limit)
    }, 'Загружены товары из АПИ');
  }

  onChangePage(page) {
    this.setState({
      ...this.getState(),
      currentPage: page
    })
    this.load();
  }
}

export default Catalog;
