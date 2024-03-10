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
      limit: 10,
      count: 0,
      currentPage: 1
    }
  }

  async load(currentPage) {

    const setPage = currentPage === 1 ? 0 : (currentPage - 1) * this.getState().limit;

    this.setState({
      ...this.getState(),
      currentPage: currentPage
    });

    try {
      const response = await fetch(`/api/v1/articles?limit=${this.getState().limit}&skip=${setPage}&fields=items(_id, title, price),count`);
      const json = await response.json();

      this.setState({
        limit: 10,
        list: json.result.items,
        count: json.result.count,
        currentPage: currentPage
      }, 'Загружены товары из АПИ');


    } catch ( e ) {
      this.setState({
        list: [],
        errorMessage: 'Данные не удалось загрузить'
      });
    }
  }
}

export default Catalog;
