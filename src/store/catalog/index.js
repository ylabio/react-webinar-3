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
      limit: 10,
      totalPage: 0,
      isLoading: false,
      error: "",
    };
  }

  async loadById(id) {
    this.setState({
      ...this.getState(),
      isLoading: true,
      error: "",
    });

    try {
      const response = await fetch(
        `/api/v1/articles/${id}?fields=price,title,description,edition,madeIn(title,code),category(title)`
      );
      if (!response.ok) {
        throw new Error("bad request");
      }
      const product = await response.json();
      this.setState(
        {
          ...this.getState(),
          list: [
            {
              ...product.result,
            },
          ],
          isLoading: false,
        },
        "Загружен товар из АПИ"
      );
    } catch (error) {
      this.setState({
        ...this.getState(),
        list: [],
        isLoading: false,
        error: error.message,
      });
    }
  }

  async load(skip = 0) {
    const limit = this.getState().limit;
    this.setState({
      ...this.getState(),
      isLoading: true,
      error: "",
      list: [],
    });
    try {
      const response = await fetch(
        `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`
      );
      if (!response.ok) {
        throw new Error("bad request");
      }
      const json = await response.json();
      this.setState(
        {
          ...this.getState(),
          list: json.result.items,
          totalPage: Math.ceil(json.result.count / limit),
          isLoading: false,
        },
        "Загружены товары из АПИ"
      );
    } catch (error) {
      this.setState({
        ...this.getState(),
        list: [],
        isLoading: false,
        error: error.message,
      });
    }
  }
}

export default Catalog;
