import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      //list: [],
      count: 0,
      pageLength: 10,
      page: 1,
    }
  }

  clearList() {
    const { list, ...newState } = this.getState();
    this.setState(newState, 'Cleared list of items');
  }

  async fetchCount() {
    const response = await fetch('/api/v1/articles?fields=items(),count');
    const json = await response.json();
    this.setState({
      ...this.getState(),
      count: json.result.count
    }, 'Fetched total number of items');
  }

  async fetchPage(page) {
    const { pageLength } = this.getState();
    const skip = (page - 1) * pageLength;
    const response = await fetch(`/api/v1/articles?limit=${pageLength}&skip=${skip}&fields=items(_id, title, price)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      page,
      list: json.result.items
    }, `Fetched page ${page}`);
  }

  async load() {
    await this.fetchCount();
    //await this.fetchPage(page);
    // const response = await fetch('/api/v1/articles?limit=256');
    // const json = await response.json();
    // this.setState({
    //   ...this.getState(),
    //   list: json.result.items
    // }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
