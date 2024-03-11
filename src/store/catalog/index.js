import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      currentPage: 1,
      list: [],
      itemsTotal: 0,
    };
  }

  async load(page = 1) {
    const response = await fetch(
      `/api/v1/articles?limit=10&skip=${
        (page - 1) * 10
      }&fields=items(_id, title, price),count`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        currentPage: page,
        list: json.result.items,
        itemsTotal: json.result.count,
      },
      "Загружены товары из АПИ"
    );
  }
}

export default Catalog;
