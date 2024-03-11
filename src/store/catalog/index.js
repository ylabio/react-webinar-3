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
      total: null,
      page: 1,
      isLoading: false,
    }
  }

  async getItems(page) {
    const skip = page === 1 ? 0 : (page - 1) * 10;
    this.setState({
      ...this.getState(),
      isLoading: true,
    })
    const response = await fetch(`/api/v1/articles?limit=10&skip=${skip}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      total: json.result.count,
      page: page,
      isLoading: false,
    }, 'loaded')
  }
}

export default Catalog;
