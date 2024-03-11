import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class PageDetails extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      result: {},
    }
  }

  async Details(id) {
    const response = await fetch(`api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      result: json.result,
    }, 'Загружены детали товара');
  }
}

export default PageDetails;