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
      pagesAmount: 0,
      page: 1,
    };
  }

  changePage(page) {
    this.setState({
      ...this.getState(),
      page,
    });
  }

  async load(page = 1) {
    const skip = (page - 1) * 10;

    const response = await fetch(
      `/api/v1/articles?limit=10&skip=${skip}&fields=items(_id, title, price),count`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        pagesAmount: Math.ceil(json.result.count / 10),
        page,
      },
      "Загружены товары из АПИ"
    );
  }
}

export default Catalog;
