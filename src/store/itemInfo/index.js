import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class ItemInfo extends StoreModule {

//   constructor(store, name) {
//     super(store, name);
//     this.generateCode = codeGenerator(0)
//     this.skip = 0
//   }

  initState() {
    return {
      itemInfo: []
    }
  }



  async getInfo(id) {

    //   let skip = (10 * currentButton) - 10;
    const response = await fetch(`api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();

    this.setState({
    ...this.getState(),
    itemInfo: json.result,
    }, 'Получена информация о товаре');
}
  }

export default ItemInfo;
