import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      list: [],
      currentPage: 1,
      limitPerPage: 10,
      numberOfPages: null,
      isLoading: false,
    };
  }

  async load() {
    this.setState({
      ...this.getState(),
      isLoading: true,
    });
    const response = await fetch("/api/v1/articles");
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        isLoading: false,
      },
      "Загружены товары из АПИ"
    );
  }

  async loadPerPage(limit, skip) {
    this.setState({
      ...this.getState(),
      isLoading: true,
    });
    const response = await fetch(`api/v1/articles?limit=${limit}&skip=${skip}`);
    const json = await response.json();

    this.setState(
      { ...this.getState(), list: json.result.items, isLoading: false },
      "Получено 10 товаров на странице из АПИ"
    );
  }

  async totalAmount() {
    this.setState({
      ...this.getState(),
      isLoading: true,
    });
    const response = await fetch(
      "/api/v1/articles?limit=10&skip=10&fields=items(_id, title, price),count"
    );
    const json = await response.json();
    const pages = Math.ceil(json.result.count / this.getState().limitPerPage);
    this.setState(
      {
        ...this.getState(),
        numberOfPages: pages,
        isLoading: false,
      },
      "Получено количество товаров из АПИ"
    );
  }

  setCurrentPage(page) {
    this.setState({
      ...this.getState(),
      currentPage: page,
    });
  }

  setLimit(limit) {
    this.setState({
      ...this.getState(),
      limitPerPage: limit,
    });
  }
}

export default Catalog;
