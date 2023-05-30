import { codeGenerator } from "../../utils";
import StoreModule from "../module";

const baseURL = '/api/v1/articles';

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      limit: 10,
      totalArticlesCount: 0,
      currentPage: 1,
    }
  }

  setCurrentPage(page) {
    this.setState({
      ...this.getState(),
      currentPage: page
    }, 'новая страница товаров');
    this.load();
  }

  async load() {
    this.setState({
      ...this.getState(),
      list: []
    });

    const limit = this.getState().limit;
    const skip = (this.getState().currentPage - 1) * limit;

    const response = await fetch(`${baseURL}?limit=${limit}&skip=${skip}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      totalArticlesCount: json.result.count,
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
