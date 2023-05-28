import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      currentItem: {},
      country: '',
      category: '',
      count: 0
    }
  }

  async load(limit, skip, fields) {
    const response = await fetch(`api/v1/articles?limit=${limit}&skip=${skip}&fields=items${fields},count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count
    }, 'Загружены товары из АПИ');
  }

  async loadOneItem(id) {
    const response = await fetch(`api/v1/articles/${id}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      currentItem: json.result
    }, 'Загружен один товар из АПИ');
  }

  async loadCountryItem(id) {
    const response = await fetch(`api/v1/countries/${id}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      country: json.result.title
    }, 'Загружена страна производитель из АПИ');
  }

  async loadCategoryItem(id) {
    const response = await fetch(`api/v1/categories/${id}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      category: json.result.title 
    }, 'Загружена категория товара из АПИ');
  }
}

export default Catalog;
