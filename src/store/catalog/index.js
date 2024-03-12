import {codeGenerator} from "../../utils";
import StoreModule from "../module";
import {getCountPages} from '../../utils'

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      item: {},
      count: 0
    }
  }

  async load(skip = 0, lang = 'ru') {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${skip}}&lang=${lang}&fields=items(_id, title, price),count`);
    const json = await response.json();
    const countPages = getCountPages(json.result.count);
    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: countPages
    }, 'Загружены товары из АПИ');
  }

  async loadArticle(_id) {
    const response = await fetch(`/api/v1/articles/${_id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      item: json.result
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
