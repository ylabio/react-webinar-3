import loading from "../../components/loading";
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
      skip:0,
      currentPage: 1,
      totalProductCount: 0,
      isLoading:false
    }
  }
  async load(page=1) {
    this.setState({
      ...this.getState(),
      isLoading:true})

    let pageSize=this.getState().pageSize
    let skip=this.getState().skip
    let currentPage=this.getState().currentPage
    if(currentPage!=page){
      currentPage=page
    }
    skip=(currentPage-1)*pageSize
    const response = await fetch(`/api/v1/articles?limit=${pageSize}&skip=${skip}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      totalProductCount:json.result.count,
      currentPage:currentPage,
      isLoading:false
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
