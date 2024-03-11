import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
    this.skip = 0
  }

  initState() {
    return {
      list: []
    }
  }



  async load(currentButton) {
      
      let skip = (10 * currentButton) - 10;
      const response = await fetch(`/api/v1/articles?limit=10&skip=${skip}`);

      const json = await response.json();
      this.setState({
        ...this.getState(),
        list: json.result.items,
      }, 'Загружены товары из АПИ');
    }
  }

export default Catalog;
