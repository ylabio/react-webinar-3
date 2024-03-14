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
      category: "",
      loading: false,
      error: null,
    };
  }




  
  async info(id) {
    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=category(title),price,edition,description,madeIn(title),edition,title`);
      const json = await response.json();
      const productData = {
        title: json.result.title,
        price: json.result.price,
        edition: json.result.edition,
        description: json.result.description,
        madeIn: json.result.madeIn.title,
        category: json.result.category.title,
      };
      store.setProductData({
          ...productData,
          loading: false,
          error: null,
      });
    } catch (error) {
      console.error("Error fetching product data:", error);
      store.setProductData({
          loading: false,
          error: "Failed to fetch product data",
      });
    }
  }
}  
export default Product;