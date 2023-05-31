import StoreModule from "../module";

class Detail extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      productDetail: {}
    }
  }

  async load(id) {
    if (id) {
      const endpoint = `/api/v1/articles/${id}`;
      const json = await fetch(endpoint).then(res => res.json());
      
      this.setState({
        ...this.getState(),
        productDetail: json.result
     }, 'Fetching item by id');
    }
  }

}

export default Detail;
