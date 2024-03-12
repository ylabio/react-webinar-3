import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
    this.countItems = 0
    this.skipItems = 0
  }

  initState() {
    return {
      list: [],
      isLoading: true, // для блокировки кнопок пагинации во время запроса сервера
      lang: 'ru',
    }
  }

  async load(limit, skip) {
    this.setState({
        ...this.getState(),
        // list: [],
        isLoading: true
      })
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}`);
    const json = await response.json();
    
    if (response.ok) {
      this.setState({
        ...this.getState(),
        list: json.result.items,
        isLoading: false
      }, 'Загружены товары из АПИ');
      } 
  }

  async loadCountItems(limit, skip) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`);
    const json = await response.json();
    console.log(json.result.count)
    this.setState({
      ...this.getState(),
      countItems: json.result.count
    }, 'Загружено количество товаров из АПИ');
  }

  switchLang() {
    this.setState({
        ...this.getState(),
        lang: this.getState().lang === 'ru' ? 'en' : 'ru',
      })} 
}

export default Catalog;
