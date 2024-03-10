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
      pageSize: 10,
      scip:0,
      currentPage: 1,
      totalProductCount: 0,
    }
  }
  async load(page=1) {
    let pageSize=this.getState().pageSize
    let scip=this.getState().scip
    let currentPage=this.getState().currentPage
    if(currentPage!=page){
      currentPage=page
    }
    scip=(currentPage-1)*pageSize
    const response = await fetch(`/api/v1/articles?limit=${pageSize}&skip=${scip}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      totalProductCount:json.result.count,
      currentPage:currentPage
    }, 'Загружены товары из АПИ');
  }
  changePage(page){
    this.setState({
      ...this.getState(),
      currentPage:page
    });
    this.load(page)
  }
}

export default Catalog;
