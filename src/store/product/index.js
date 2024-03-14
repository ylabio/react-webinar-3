import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Product extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
    this.state = this.initState();
  }

  initState() {
    return {
      title: "",
      price: 0,
      edition: 0,
      description: "",
      madeIn: "",
      loading: false,
      error: null,
    };
  }

  async info(id) {
    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=title,price,edition,description,madeIn`);

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const json = await response.json();
      const productData = {
        title: json.result.title,
        price: json.result.price,
        edition: json.result.edition,
        description: json.result.description,
        madeIn: json.result.madeIn,
      };

      this.setState({
        ...this.getState(),
        ...productData,
        loading: false,
        error: null,
      }, "Данные успешно загружены");
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
      this.setState({
        ...this.getState(),
        loading: false,
        error: 'Failed to load data. Please try again later.',
      });
    }
  }
}

export default Product;