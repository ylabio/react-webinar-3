import StoreModule from "../module";

class Item extends StoreModule {

  initState() {
    return {
      data: {},
      isLoading: true
    }
  }

  async load(_id) {
    const response = await fetch(`/api/v1/articles/${_id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      data: json.result,
      isLoading: false
    }, 'Загружен товар');
  }

  setLoading(state) {
    this.setState({isLoading: state});
  }
}

export default Item;
