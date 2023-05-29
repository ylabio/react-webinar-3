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
      currentPage: 1,
      totalPages: 0,
      limit: 10,
      loading: false
    }
  }

  async load() {
    this.setState({...this.getState(), loading: true})
    const response = await fetch(`api/v1/articles?limit=10&skip=${(this.getState().currentPage - 1) * this.getState().limit}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
       ...this.getState(),
       list: json.result.items,
       totalPages: Math.ceil(json.result.count / this.getState().limit),
       loading: false,
    }, 'Загружены товары из АПИ');
  }

  changePage(page) {
    this.setState({
      ...this.getState(),
      currentPage: page
    })
  }
}

export default Catalog;
