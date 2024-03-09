import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Pagination extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      currentPage: 1,
      limitPerPage: 10,
      numberOfPages: null,
    };
  }

  async totalAmount() {
    let pages = 0;
    const response = await fetch(
      "/api/v1/articles?limit=10&skip=10&fields=items(_id, title, price),count"
    );
    const json = await response.json();
    pages = Math.ceil(json.result.count / this.getState().limitPerPage);
    this.setState(
      {
        ...this.getState(),
        numberOfPages: pages,
      },
      "Получено количество товаров из АПИ"
    );
  }

  setCurrentPage(page) {
    this.setState({
      ...this.getState(),
      currentPage: page,
    });
    console.log(this.getState());
  }

  setLimit(limit) {
    this.setState({
      ...this.getState(),
      limitPerPage: limit,
    });
    console.log(this.getState());
  }
}

export default Pagination;
