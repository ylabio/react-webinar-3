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
      count: 0,
      currentPage: 1,
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

  changePage(page) {
    this.setState({
      ...this.getState(),
      currentPage: page
    })
  }
}

export default Catalog;
