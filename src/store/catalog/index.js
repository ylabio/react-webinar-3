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
      currentPage: 1,
      totalPage: 1,
    };
  }

  async load(page = 1) {
    try {
      const limit = 10;
      const skip = (page - 1) * limit;
      const response = await fetch(
        `api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`
      );
      const json = await response.json();
      this.setState(
        {
          ...this.getState(),
          list: json.result.items,
          currentPage: page,
          totalPage: Math.ceil(json.result.count / limit),
        },
        "Загружены товары из АПИ"
      );
    } catch (error) {
      console.error(error);
    }
  }

  async fetchProduct(productId) {
    try {
      const response = await fetch(
        `/api/v1/articles/${productId}?fields=title,description,price,madeIn(title,code),category(title),edition`
      );

      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  }
}

export default Catalog;
