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
      itemsCount: 0,
      itemsPerPage: 10,
    };
  }

  async load(skip = 0, limit = 10) {
    const response = await fetch(
      `/api/v1/articles?${limit}=10&skip=${skip}&fields=items(_id, title, price),count`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        itemsCount: json.result.count,
      },
      "Загружены товары и их количество из АПИ"
    );
  }
}

export default Catalog;
