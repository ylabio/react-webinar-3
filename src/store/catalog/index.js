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
      totalPages: 1
    }
  }

  async load(limit = 10) { 
    const {currentPage} = this.getState();
    const skip = (currentPage-1) * 10;
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`);
    const json = await response.json();
    const totalPages = Math.ceil(json.result.count / limit)
    this.setState({
      ...this.getState(),
      list: json.result.items,
      totalPages: totalPages
    }, 'Загружены товары из API');
  }
  
  setCurrentPage(page) {
    this.setState({
      ...this.getState(),
      currentPage: page
    }, 'Изменена текущая страница');
  }

}

export default Catalog;
