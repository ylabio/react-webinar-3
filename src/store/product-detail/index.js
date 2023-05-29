
import StoreModule from "../module";

class Detail extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      data: []
    }
  }

  async load(id) {
    const url = `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`;
    const response = await fetch(url);
    const json = await response.json();
    this.setState({ ...this.getState(), data: json.result }, 'Загружены детали товара');
  }
}
export default Detail;
