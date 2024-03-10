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
      product: null,
      currentPage: 1,
      limit: 10,
      totalItems: null
    }
  }

  async load(limit = 10, skip = 0) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items
    }, 'Загружены товары из АПИ');
  }

  async getTotalItems() {
    const response = await fetch(`/api/v1/articles?limit=10&skip=10&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      totalItems: json.result.count
    }, 'Загружено общее количество товаров');
  }

  async getProduct(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      product: json.result
    }, 'Загружен текущий продукт');
  }

  changeCurrentPage(page) {
    this.setState({
      ...this.getState(),
      currentPage: page
    }, 'Изменена текущая страница');
  }
}

export default Catalog;
