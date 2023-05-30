import StoreModule from "../module";
import {Api} from "../../api";

class Item extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      info: {
        title: '',
        description: '',
        edition: '',
        price: '',
        madeIn: {
          title: '',
          code: ''
        },
        category: {
          title: ''
        }
      }
    }
  }

  async load(id) {
    const json = await Api.getItem(id);
    this.setState({
      ...this.getState(),
      info: json.result
    }, 'Загружена информация о товаре из АПИ');
  }
}

export default Item;