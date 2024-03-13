import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Product extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      detail : null,
      isLoading: false,
    }
  }

  async getDetailProduct(id) {
    this.setState({
      ...this.getState(),
      detail : null,
      loading: true,
    });

    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=title,description,price,madeIn(title,code),category(title),edition`);
      const data = await response.json();
      this.setState({
        detail: data.result,
        loading: false,
      }, 'Загружен товар из АПИ');

    } catch (error) {
      this.setState({
        detail: null,
        loading: false,
        errorMessage: `Ошибка ${error.message}`
      });
    }
  }
}

export default Product;
