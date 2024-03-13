import { useParams } from "react-router";
import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
    this.initPagination();
  }

  initState() {
    return {
      list: [],
      totalItems: 0,
      totalPages: 0,
      itemPerPage : 10,
    }
  }

  async initPagination(){
    const response = await fetch("/api/v1/articles?limit=10&skip=10&fields=items(_id, title, price),count");
    const json = await response.json();
    const totalItems = json.result.count;
    const totalPages = Math.ceil(totalItems/this.store.getState().catalog.itemPerPage)
    this.setState({
      ...this.getState(),
      totalItems: totalItems,
      totalPages: totalPages,
    },`Загрузили параметры пагинации`)
  }

  async loadCurrPage(pageNum){
    const itemsToSkip = this.store.getState().catalog.itemPerPage * (pageNum - 1);
    const response = await fetch(`/api/v1/articles?limit=${this.store.getState().catalog.itemPerPage}&skip=${itemsToSkip}`, {
      headers: {
        'Accept-Language': this.store.getState().locale.lang
      }
    });
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list : json.result.items
    },`Загружена страница ${pageNum} с товарами`)
  }

  async load() {
    const response = await fetch('/api/v1/articles');
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
