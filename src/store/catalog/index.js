import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Card extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
    };
  }

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

  async itemCount({ setItemCount }) {
    const response = await fetch(
      "/api/v1/articles?limit=10&skip=10&fields=items(_id, title, price),count"
    );
    const json = await response.json();
    setItemCount(json.result.count);
  }
}

export default Card;
