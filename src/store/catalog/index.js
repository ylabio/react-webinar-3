import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
    this.limit = 10;
  }

  initState() {
    return {
      list: [],
      currentPage: 1,
    };
  }

  async clickPage(page) {
    this.setState(
      {
        ...this.getState(),
        currentPage: page,
      },
      `Выполнен переход на страницу ${page}`
    );
    this.load();
  }

  async load() {
    const currentPage = this.store.state.catalog.currentPage;
    const perPage = this.limit;
    const skip = currentPage * perPage - perPage;
    const response = await fetch(
      `api/v1/articles?limit=${perPage}&skip=${skip}`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      "Загружены товары из АПИ"
    );
  }

  async itemCount() {
    const response = await fetch(
      "/api/v1/articles?limit=10&skip=10&fields=items(_id, title, price),count"
    );
    const json = await response.json();
    const itemCount = json.result.count;
    const perPage = this.limit;
    const pagesCount = Math.ceil(itemCount / perPage);
    this.setState({
      ...this.getState(),
      pagesCount: pagesCount,
    });
  }
}

export default Catalog;
