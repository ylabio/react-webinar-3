import StoreModule from "../module";

class Details extends StoreModule {

  initState() {
    return {
      list: [],
    }
  }

  async loadItem(itemId) {
    const response = await fetch(`api/v1/articles/${itemId}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
       ...this.getState(),
       list: json.result,
    },);
  }
}

export default Details;