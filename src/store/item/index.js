import StoreModule from "../module";
import { mainApi } from "../../api";

class Item extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      item: {}
    }
  }

  async load(id) {
    const item = await mainApi.getItem(id);
    this.setState({
       ...this.getState(),
       item: item
    }, 'Загружен товар из АПИ');
    return item;
  }
}

export default Item;
