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
      totalPages: 1,
      productPerPage: 10,
    };
  }

  async load(page) {
    const response = await fetch(
      `/api/v1/articles?limit=${this.getState().productPerPage}&skip=${
        (page - 1) * this.getState().productPerPage
      }&fields=items(_id, title, price),count`
    );
    const {
      result: { items: list = [], count },
    } = await response.json();

    this.setState(
      {
        ...this.getState(),
        list,
        totalPages: Math.ceil(count / this.getState().productPerPage),
        currentPage: page,
      },
      "Загружены товары из АПИ"
    );
  }

  async loadOne(id) {
    if (!this.getState().list.length) {
      const product = await fetch(
        `/api/v1/articles/${id}?fields=*,madeIn(title,price)`
      );

      const { result } = await product.json();

      console.log(result);

      this.setState({
        ...this.getState(),
        list: [
          {
            _id: result._id,
            title: result.title,
            price: result.price,
          },
        ],
      });
    }
  }
}

export default Catalog;
