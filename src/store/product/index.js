import StoreModule from "../module";

class Product extends StoreModule {

  initState() {
    return {
      info: {
        id: null,
        name: null,
        madeIn: null,
        description: null,
        category: null,
        edition: null,
        price: null
      },
      loading: false,
      error: false
    }
  }

  reset() {
    this.setState({
      ...this.initState()
    })
  }

  async load(id) {
    try {
      this.setState({
        loading: true
      })
      const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
      const json = await response.json();
      this.setState({
        info: {
          id: json.result._id,
          name: json.result.title,
          description: json.result.description,
          madeIn: `${json.result.madeIn.title} (${json.result.madeIn.code})`,
          category: json.result.category.title,
          edition: json.result.edition,
          price: json.result.price
        },
        loading: false
      }, 'Загружены товар из АПИ');
    } catch (error) {
      this.setState({
        error: true,
        loading: false
      })
    }

  }
}

export default Product;
