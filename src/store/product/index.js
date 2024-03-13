import StoreModule from "../module";

class Product extends StoreModule {

  initState() {
    return {
        madeIn : {},
        category : "",
        edition : "",
        price : "",
        description : ""
    }
  }

  async getProduct(id) {
    if(!id) redirect("/")
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,{
        headers: {
                'Accept-Language': this.store.getState().locale.lang
        }
    });
    const {result} = await response.json();

    this.setState({
        ...this.getState(),
        ...result
      }, 'Загрули страницу товара');
}

}

export default Product;
