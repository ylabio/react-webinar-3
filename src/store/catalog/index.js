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
      count: 0,
      skip: 0,
      limit: 0,
      currentPage: 1,
    };
  }

  setPage(page) {
    this.setState(
      {
        ...this.getState(),
        currentPage: page,
      },
      "Изменена страница"
    );
  }

  async load(limit = 10, skip = 0) {
    const response = await fetch(
      `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(*),count`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
        skip: skip,
        limit: limit,
      },
      "Загружены товары из АПИ"
    );
  }
}

export default Catalog;
