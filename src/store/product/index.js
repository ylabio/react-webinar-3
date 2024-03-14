import StoreModule from "../module";

class Product extends StoreModule {
  
  initState() {
    const productData = localStorage.getItem("product");

    return {
      product: productData ? JSON.parse(productData) : null,
      isLoading: false,
    };
  }

  async loadProduct(id) {
    this.setState({
      ...this.getState(),
      isLoading: true,
    });
    const response = await fetch(
      `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
    );
    const json = await response.json();

    this.setState({
      ...this.getState(),
      product: json.result,
      isLoading: false,
    });
    localStorage.setItem("product", JSON.stringify(this.getState().product));
  }
}

export default Product;
