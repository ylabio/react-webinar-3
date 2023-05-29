import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Article extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      good: {},
      isLoading: false
    }
  }

  async load(id) {
    try {
      this.setState({...this.getState(), isLoading: true}, 'Идёт загрузка товара из АПИ');
      const response = await fetch(`/api/v1/articles/${id}?fields=title,description,price,edition,madeIn(title,code),category(title)`);
      const json = await response.json();
      this.setState({
         ...this.getState(),
         good: json.result,
      }, 'Товар из АПИ получен и сохранен в Store');
    } catch (e) {
      console.error(e);
    } finally {
      this.setState({...this.getState(), isLoading: false}, 'Загрузка товара из АПИ окончена');
    }

  }
}

export default Article;
