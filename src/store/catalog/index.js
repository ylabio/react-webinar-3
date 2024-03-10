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

  async getTotalLength(){
    const response = await fetch(`/api/v1/articles?limit=10&skip=10&fields=items(_id, title, price),count`)
    const length = await response.json();
    this.setState({
      ...this.getState(),
      length: length.result.count,
    })
  }

  async load(skipValue) {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${skipValue}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
