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
    }
  }

  getPage(page) {
    console.log(page)
    this.setState({
      ...this.getState(),
      currentPage: page
    }, 'Получили текущую страницу');
    this.load();
  }

  async load() {
    const page = Number(this.getState().currentPage);
    console.log(page)
    const response = await fetch(`/api/v1/articles?limit=10&skip=${page - 1}0&fields=items(_id, title, price),count`);
    const json = await response.json();
    console.log(json.result)
    this.setState({
       ...this.getState(),
       list: json.result.items
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
