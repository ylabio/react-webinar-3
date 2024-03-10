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
      page: 1,
      limit: 10,
      count: 0,
      isLoading: false,
      detail : null,
    }
  }

  async load(page) {

   const setPage = page === 1 ? 0 : (page - 1) * 10;

    this.setState({
      ...this.getState(),
      loading: true,
      page: page
    });

    try {
      const response = await fetch(`/api/v1/articles?limit=${this.setState.limit}}&skip=${setPage}&fields=items(_id, title, price),count`);
      const data = await response.json();

      this.setState({
        list: data.result.items,
        page: page,
        limit: 10,
        count: data.result.count,
        loading: false,
      }, 'Загружены товары из АПИ');
    } catch ( error ) {
      this.setState({
        list: [],
        loading: false,
        errorMessage: `Ошибка ${error.message}`
      });
    }
  }
}

export default Catalog;
