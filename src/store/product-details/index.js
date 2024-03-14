import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class ProductDetails extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      result: {},
    }
  }

  async load(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      result: json.result,
    }, 'Загружена информация о товаре из АПИ');
  }
}

export default ProductDetails;
