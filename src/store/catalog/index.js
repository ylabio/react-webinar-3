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
      totalItemsCount: 0,
      isLoading: true
    }
  }

  async load(limit = 10, skip = 0) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      totalItemsCount: json.result.count,
      isLoading: false
    }, 'Загружены товары из АПИ');
  }

  setLoading(state) {
    this.setState({isLoading: state});
  }
}

export default Catalog;
