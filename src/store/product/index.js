import StoreModule from "../module";
import {getFullProductData} from "../../api";

class Product extends StoreModule {
  initState() {
    return {productData: null, isLoading: false};
  }


  async load(id) {
    try {
      this.setState({...this.getState(), isLoading: true});
      const productData = await getFullProductData(id);
      this.setState({...this.getState(), productData});
    } catch (e) {
      console.log(e.message);
    } finally {
      this.setState({...this.getState(), isLoading: false});
    }
  }

  clear() {
    this.setState({...this.getState(), productData: null});
  }
}

export default Product;
