import { useParams } from "react-router";
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

  async loadCurrPage(pageNum){
    console.log(pageNum)
    const itemsPerPage = 10;
    const itemsToSkip = itemsPerPage * (pageNum - 1);
    const response = await fetch(`/api/v1/articles?limit=${itemsPerPage}&skip=${itemsToSkip}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list : json.result.items
    },`Загружена страница ${pageNum} с товарами`)
  }

  async load() {
    const response = await fetch('/api/v1/articles');
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
