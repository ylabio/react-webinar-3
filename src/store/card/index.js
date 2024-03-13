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

  async dataCard({ setItem, id }) {
    const response = await fetch(
      `api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: [json.result],
      },
      "Загружен товар из АПИ"
    );
    setItem(json.result);
  }
}

export default Card;
