import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      pagination: {
        limit: 10,
        current: undefined,
        max: undefined,
        loadingPage: undefined,
      },
      error: null,
    }
  }

  async load(pageNumber) {
    const pagination = this.getState().pagination;
    if(pagination.current && pagination.current === pageNumber) return;

    this.setState({
      ...this.getState(),
      pagination: {
        ...pagination,
        loadingPage: pageNumber,
      },
    }, `Начата загрузка товаров из АПИ для страницы ${pageNumber}`);

    const skip = (pageNumber -1 ) * pagination.limit;
    const query = `?limit=${pagination.limit}&skip=${skip}&fields=items(_id, title, price),count`;
    let error, json;
    try {
      const response = await fetch('/api/v1/articles' + query);
      json = await response.json();
      error = json.error;
    } catch(e) {
      error = e;
    }
    const max = Math.ceil(json.result?.count / pagination.limit);
    if(max && pageNumber > max){
      console.log('recursion')
      return this.load(max);
    }
    if(this.getState().pagination.loadingPage !== pageNumber) return;
    this.setState({
      ...this.getState(),
      list: json.result?.items || [],
      pagination: {
        ...pagination,
        max: max || undefined,
        current: pageNumber,
        loadingPage: undefined,
      },
      error: error || null,
    }, `Загружены товары из АПИ для страницы ${pageNumber}`);
  }
}

export default Catalog;
