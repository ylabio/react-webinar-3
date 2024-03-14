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
      count: 0,
      page: 1,

      
    }
  }
  

  async load(page) {
    let skip = page == 1 ? 0 : (10 * page) - 1;

    this.setState({
      ...this.getState({
        page:page,

      })
    })
    
    const response = await fetch(`api/v1/articles?limit=10&skip=${skip}&fields=items(_id, title, price),count`);
    const json = await response.json();
    

    this.setState({
      list: json.result.items,
      count: json.result.count,
      page: page,
      
    }, 'Загружены товары из АПИ');

  
    }
  }

export default Catalog;
