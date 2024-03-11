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
      loading: false,
      page: 1
    }
  }

  async getCatalog( page ) {

    const setPage = page === 1 ? 0 : (page - 1) * 10;

    this.setState({
      ...this.getState(),
      loading: true,
      page: page
    });

    try {
      const response = await fetch(`/api/v1/articles?limit=${this.getState().limit}&skip=${setPage}&fields=items(_id, title, price),count`);
      const json = await response.json();

      this.setState({
        limit: 10,
        list: json.result.items,
        loading: false,
        count: json.result.count,
        page: page
      }, 'Загружены товары из АПИ');


    } catch ( e ) {
      this.setState({
        list: [],
        loading: false,
        errorMessage: 'Данные не удалось загрузить'
      });
    }
  }
}

export default Catalog;
