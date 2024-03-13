import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
    this.countItems=1;
    this.skip_limit={}
    this.productId;
  }

  initState() {
    return {
      list: []
    }
  }
getCountItems(){
  return this.countItems;
}

  // async load() {
  //   const response = await fetch('/api/v1/articles');
  //   const json = await response.json();
  //   this.setState({
  //     ...this.getState(),
  //     list: json.result.items
  //   }, 'Загружены товары из АПИ');
  // }
  async getPageLoad(skip,limit){
    const response = await fetch(`api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.countItems=json.result.count;
    this.setState({
      ...this.getState(),
      list: json.result.items
    }, 'Загружены товары из АПИ');
  }

}

export default Catalog;
