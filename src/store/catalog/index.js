import {codeGenerator} from "../../utils";
import StoreModule from "../module";
import {Api} from "../../api";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      countItems: 0,
      perPage: 10,
      pageAmount: 1
    }
  }

  async load(currentPage, perPage) {
    const skip = perPage * (currentPage - 1);
    const json = await Api.getCatalog(skip, perPage);
    const pageAmount = Math.ceil(json.result.count / perPage);
      this.setState({
      ...this.getState(),
      list: json.result.items,
      countItems: json.result.count,
      pageAmount
    }, 'Загружены товары из АПИ');
  }

  setPerPage(perPage) {
    this.setState({
      ...this.getState(),
      perPage
    }, 'Изменено количество отображаемых товаров на странице');
  }
}

export default Catalog;
