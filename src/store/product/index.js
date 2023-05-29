import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Product extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      item: null,
      loading: false
    }
  }

  // Загрузка подробной информации о товаре по его id, включая страну и категорию
  async load(id) {
    this.setState({
      item: null,
      loading: true
    });

    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();

    this.setState({
       item: json.result,
       loading: false
    }, 'Загружен товар из АПИ по id');
  }

  clean() {
    this.setState({item: null, loading: false});
  }
}

export default Product;
