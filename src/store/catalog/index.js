import {codeGenerator} from "../../utils";
import StoreModule from "../module";

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

  async load(firsPageIndex) {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${firsPageIndex}`);
    const json = await response.json();
    debugger
    this.setState({
      ...this.getState(),
      list: json.result.items
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
