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
      page: 0,
      maxPage: 0,
      item: {}
    };
  }

  changePage(numb) {
    console.log(numb);
    this.setState(
      {
        ...this.getState(),
        page: numb,
      },
      "Загружена другая страница"
    );
    this.load();
  }

  async load() {
    const response = await fetch(
      `/api/v1/articles?limit=10&skip=${this.getState().page * 10}`
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

  async loadItem(id) {
    const response = await fetch(
      `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        item: json.result,
      },
      "Загружены товары из АПИ"
    );
  }

  async getMax() {
    const response = await fetch(
      "/api/v1/articles?limit=10&skip=10&fields=items(),count"
    );
    const json = await response.json();
    this.setState({
      ...this.getState(),
      maxPage: Math.ceil(json.result.count / 10),
    });
  }
}

export default Catalog;
