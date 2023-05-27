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
      openedItem: null,
      totalItems: 0,
      currentPage: 1
    }
  }

  async load(limit = 10, skip = 0) {
    const response = await fetch(`/api/v1/articles?fields=items(_id, title, price),count&limit=${limit}&skip=${skip}`);
    const json = await response.json();
    this.setState({
       ...this.getState(),
       list: json.result.items,
      totalItems: json.result.count,
    }, 'Загружены товары из АПИ');
  }

  changePage(page) {
    this.setState({
      ...this.getState(),
      currentPage: page
    });
    this.load(10, (this.getState().currentPage - 1) * 10);
  }

  async getProductData(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      openedItem: json.result
    })
  }

}

export default Catalog;
