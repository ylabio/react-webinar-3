import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Detail extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      detail: {},
    }
  }

  async loadById(id) {
  //const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
   const response = await fetch(`/api/v1/articles/${id}?fields=_id,price,description,title,edition,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
       ...this.getState(),
       detail: json.result,
    }, 'Загружен товар из АПИ');
  }
}

export default Detail;
