import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class ItemStore extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      itemDetails: {},
    }
  }

  async getItemDetails(id) {
    const response = await fetch(`api/v1/articles/${id}?fields=*,_id,description,title,price,edition,madeIn(title, code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      itemDetails: json.result,
    }, 'details')
  }
}

export default ItemStore;
