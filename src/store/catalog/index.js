import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      pages: {
        itemsPerPage: 10,
        currentPage: 1,
        lastPage: undefined
      }
    }
  }

  async load(page) {
    const pages = this.getState().pages;

    const skip = (page - 1) * pages.itemsPerPage || 0;

    const fetchParams = new URLSearchParams({
      limit: pages.itemsPerPage,
      skip,
      fields: 'items(_id, title, price),count',
    });

    const response = await fetch(`/api/v1/articles?${fetchParams}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const {result} = await response.json();

    this.setState({
      ...this.getState(),
      list: result.items,
      pages: {
        ...pages,
        lastPage: Math.ceil(result.count / pages.itemsPerPage),
        currentPage: page
      }
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
