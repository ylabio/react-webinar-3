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
      item: {},
      currentPage: null,
      lastPage: null
    }
  }

  async setNewList(page) {
    const skippedCount = (page - 1) * 10;
    const parameters = page > 1 ? `?limit=10&skip=${skippedCount}` : '';

    const response = await fetch(`/api/v1/articles${parameters}`);
    const json = await response.json();
    return json.result.items;
  }

  async setCurrentItem(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      item: json.result ?? this.getState().item
    }, 'Загружен текущий товар из АПИ')  
  }

  getLastPage(count) {
    let page;
    switch (count) {
      case (count <= 10):
        page = 1;
        break;
      case (count % 10 === 0):
        page = count / 10;
        break;
      default:
        page = Math.floor(count / 10) + 1;
        break;
    }
    return page;
  }

  setCurrentPage(page) {
    this.setState({
      ...this.getState(),
      currentPage: page
    }, 'Изменена текущая страница')
  }

  async loadItemsCount() {
    const response = await fetch('api/v1/articles?fields=items(), count');
    const json = await response.json();
    return json.result.count;
  }

  async load() {
    const count = await this.loadItemsCount();
    const lastPage = this.getLastPage(count);
    const currentPage = this.getState().currentPage ?? 1;
    const list = await this.setNewList(currentPage);

    this.setState({
      ...this.getState(),
      list: list,
      currentPage: currentPage,
      lastPage: lastPage
    }, 'Загружены товары и количество страниц из АПИ')
  }
}

export default Catalog;
