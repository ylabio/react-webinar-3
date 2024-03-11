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
    };
  }

  // async load() {
  //   const response = await fetch("/api/v1/articles");
  //   const json = await response.json();
  //   this.setState(
  //     {
  //       ...this.getState(),
  //       list: json.result.items,
  //     },
  //     "Загружены товары из АПИ"
  //   );
  // }

  async load({ currentPage, limit }) {
    const skip = currentPage * limit - limit;
    const response = await fetch(`api/v1/articles?limit=${limit}&skip=${skip}`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      "Загружены товары из АПИ"
    );
  }

  async dataCard({ setItem, id }) {
    const response = await fetch(
      `api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
    );
    const json = await response.json();
    setItem(json.result);
  }

  async itemCount({ setItemCount }) {
    const response = await fetch(
      "/api/v1/articles?limit=10&skip=10&fields=items(_id, title, price),count"
    );
    const json = await response.json();
    setItemCount(json.result.count);
  }
}

export default Catalog;
