import { codeGenerator } from "../../utils";
import StoreModule from "../module";

const baseURL = '/api/v1/articles';

class Catalog extends StoreModule {

  constructor(store, name) {
Expand All
	@@ -10,16 +12,33 @@ class Catalog extends StoreModule {

  initState() {
    return {
      list: [],
      limit: 10,
      totalArticlesCount: 0,
      currentPage: 1,
    }
  }

  setCurrentPage(page) {
    console.log(page)
    this.setState({
      ...this.getState(),
      currentPage: page
    }, 'новая страница товаров');
    this.load();
  }

  async load() {
    const limit = this.getState().limit;
    const skip = (this.getState().currentPage - 1) * limit;

    const response = await fetch(`${baseURL}?limit=${limit}&skip=${skip}&fields=items(*),count`);
    const json = await response.json();
    console.log(json)
    this.setState({
      ...this.getState(),
      list: json.result.items,
      totalArticlesCount: json.result.count,
    }, 'Загружены товары из АПИ');
  }
}
