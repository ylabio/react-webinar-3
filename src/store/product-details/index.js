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
      waiting: true,
    }
  }

  async load(id) {
    this.setState({
      result: {},
      waiting: true,
    })

    try {

      const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
      const json = await response.json();
      this.setState({
        result: json.result,
        waiting: false,
      }, 'Загружена информация о товаре из АПИ');

      //@todo в стейм можно положить информацию об ошибке.
    } catch(e) {
      this.setState({
        result: {},
        waiting: false,
      })
    }
  }
}

export default ProductDetails;
