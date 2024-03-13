import { codeGenerator } from "../../utils";
import StoreModule from "../module";

const amountPerPage = 10;

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      isError: false,
      isLoading: true,
      currentPage: 1,
      totalPages: 1,
    };
  }

  setCurrentPage(page) {
    this.setState({
      ...this.getState(),
      currentPage: page,
    });
  }

  async load(page) {
    const skip = (page - 1) * amountPerPage;
    try {
      const response = await fetch(
        `/api/v1/articles?limit=${amountPerPage}&skip=${skip}&fields=items(_id, title, price),count`
      );
      const json = await response.json();
      this.setState(
        {
          ...this.getState(),
          list: json.result.items,
          currentPage: page,
          isLoading: false,
          totalPages: Math.ceil(json.result.count / amountPerPage),
        },
        "Загружены товары из АПИ"
      );
    } catch (e) {
      this.setState({
        ...this.getState(),
        list: [],
        isLoading: false,
        isError: true,
      });
    }
  }
}

export default Catalog;
