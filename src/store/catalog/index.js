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
      count: 0,
      current: 1,
      itemInfo: {}
    }
  }

  async load() {
    const response = await fetch('/api/v1/articles');
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items
    }, 'Загружены товары из АПИ');
    console.log(11, json.result.items);
  }

  async loadPage(pageNumber) {
    const limit = 10;
    let skip;
    if (this.store.state.catalog.count) {
      skip = limit * (pageNumber - 1);
    } else {
      skip = 0;
    }
    const response = await fetch(`api/v1/articles?limit=${limit}&skip=${skip}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      current: pageNumber,
    })
  }

  async loadCount() {
    const response = await fetch('api/v1/articles?limit=10&skip=10&fields=items(_id, title, price),count');
    const json = await response.json();
    this.setState({
      ...this.getState(),
      count: json.result.count,
    })
  }

  async loadItem(id) {
    const response = await fetch(`api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      itemInfo: json.result
    });
  }

  switchPage(event) {
    const currentPage = event.target.innerText;
    this.setState({
      ...this.getState(),
      current: +currentPage,
    });
    this.loadPage(+currentPage);
  }
}

export default Catalog;
