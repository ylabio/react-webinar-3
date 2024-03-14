import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      currentPage: 1,
      pagesQuantity: 0
    }
  }

  async load(pageNumber) {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${10 * (pageNumber - 1)}&fields=items(_id, title, price)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items
    }, 'Загружены товары из API по номеру страницы');
  }

  async getPagesQuantity() {
    const response = await fetch('/api/v1/articles?&fields=items(_id),count');
    const json = await response.json();
    this.setState({
        ...this.getState(),
        pagesQuantity: Math.ceil(json.result.count/10)
    }, `Общее количество страниц ${Math.ceil(json.result.count/10)}`);
  }

  changePage(page) {
    this.setState({
        ...this.getState(),
        currentPage: Number(page)
    })
  }
}

export default Catalog;