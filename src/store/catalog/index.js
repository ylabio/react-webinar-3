import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      currentPage: 1,
      totalPages: 0,
    };
  }

  async load(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const response = await fetch(
      `/api/v1/articles?limit=${limit}&skip=${skip}`
    );
    const json = await response.json();
    const totalPages = Math.ceil(json.result.totalCount / limit);
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        currentPage: page,
        totalPages: totalPages,
      },
      "Загружены товары из АПИ"
    );
  }
}

export default Catalog;
