import StoreModule from "../module";

class Product extends StoreModule {

  initState() {
    return {
      data: {},
      isLoading: true,
      isError: false,
    }
  }

  async getProduct(id) {
    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
      const json = await response.json();
      this.setState({
        ...this.getState(),
        data: json.result,
        isLoading: false
      })
    } catch (e) {
        this.setState({
          ...this.getState(),
          isLoading: false,
          isError: true,
        })
    }
  }
}

export default Product