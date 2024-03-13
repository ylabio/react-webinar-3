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
      params: {
        page: 1,
        limit: 10
      },
      count: 0,
      request: true
    }
  }

  async load(newParams = {}) {

    const params = { ...this.getState().params, ...newParams }

    this.setState({
      ...this.getState(),
      params,
      request: true
    }, 'Установлены параметры');


    const apiParams = {
      limit: params.limit,
      skip: (params.page - 1) * params.limit,
      fields: 'items(*),count',
      lang: params.lang
    };

    const response = await fetch(`/api/v1/articles?${new URLSearchParams(apiParams)}`);

    const json = await response.json();
    console.log(json);

    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count,
      request: false
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
