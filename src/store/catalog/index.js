import {codeGenerator} from "../../utils";
import StoreModule from "../module";

const LIMIT = 10;

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      pages: 0,
      currentPage: 1,
      details: {}
    }
  }

  async load(page = this.getState().currentPage) {
    // const response = await fetch(`/api/v1/articles?limit=${LIMIT}&skip=10&fields=items(_id, title, price),count`);
    const response = await fetch(`/api/v1/articles?limit=${LIMIT}&skip=${(page-1)*LIMIT}&fields=items(_id, title, price),count`);
    // const response = await fetch(`/api/v1/articles?limit=${10}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      pages: Math. trunc(json.result.count / LIMIT),
      currentPage: page,
      details: {},
    }, 'Загружены товары из АПИ');
  }

  async loadDetails(id) {
    // const response = await fetch(`/api/v1/articles/${id}`);
    try{
      const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
          const json = await response.json();
          this.setState({
            ...this.getState(),
            details: json.result
          }, `Получили детали товара с id ${id}`);
          return json.result
    }catch(error){
      throw new Error(error.message);
    }

  }
}

export default Catalog;
