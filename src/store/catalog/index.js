import {codeGenerator, getRange} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      loading: false,
      list: [],
      totalCountItems: 0,
      pages: 0,
      limit: 10,
      activePage: 1
    }
  }

  async load(page = 1) {
    const limit = this.getState().limit
    const skip = limit * (page - 1)

    this.setLoading()
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`);
    const json = await response.json();

    this.setState({
      ...this.getState(),
      list: json.result.items,
      totalCountItems: json.result.count,
      pages: Math.ceil(json.result.count / 10),
      activePage: page,
      loading: false
    }, 'Загружены товары из АПИ');
  }

  setLoading() {
    this.setState({
      ...this.getState(),
      loading: true
    }, 'Загрузка');
  }
}

export default Catalog;
