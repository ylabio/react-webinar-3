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
      listLength: 0, 
      limit: 10,
    }
  }

  async load(skip, limit) {
    const skipValue = skip > 0 ? skip - 1 : skip;
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skipValue * 10}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      listLength: json.result.count
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
