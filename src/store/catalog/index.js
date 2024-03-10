import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
    this.state = this.initState();
  }

  initState() {
    return {
      list: [],
      currentPage: 1,
      totalPages: 1,
      loading: false,
      error: null,
    };
  }

  async load(page) {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${(page - 1) * 10}&fields=items(_id, title, price),count`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
        currentPage: page,
      },
      "Загружены товары из АПИ"
    );
  }
}

export default Catalog;
