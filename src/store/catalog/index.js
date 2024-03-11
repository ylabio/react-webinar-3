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
      currentPage: 1,
      totalCount: 0,
      totalPage: 1,
      limit: 10,
    }
  }

  async load(limit = 10, currentPage = 1) {
    const skip = ( currentPage - 1 ) * limit;
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items
    }, 'Загружены товары из АПИ');
    this.getTotalCount();
  }
  
  async getTotalCount() {
    const response = await fetch(`/api/v1/articles?limit=10&skip=10&fields=items(_id),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      totalCount: json.result.count,
      totalPage: Math.ceil( json.result.count / this.getState().limit)
    });
  }  
};

export default Catalog;
