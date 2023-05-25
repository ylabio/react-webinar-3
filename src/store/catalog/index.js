import {codeGenerator} from "../../utils";
import StoreModule from "../module";

const NUMBER_OF_PRODUCT_PER_PAGE = 10;

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      page: 0,
      lastPage: 0
    }
  }

  async load(page = 0) {
    const limit = NUMBER_OF_PRODUCT_PER_PAGE;
    const skip = page * NUMBER_OF_PRODUCT_PER_PAGE;
    const url = `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`;

    const response = await fetch(url);
    const json = await response.json();
    const list = json.result.items;
    const lastPage = Math.ceil(json.result.count / NUMBER_OF_PRODUCT_PER_PAGE) - 1;

    this.setState({
      ...this.getState(),
      list,
      page,
      lastPage
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
