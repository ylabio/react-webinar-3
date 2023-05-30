import {codeGenerator} from "../../utils";
import StoreModule from "../module";
import { mainApi } from "../../api";

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
      itemsPerView: 10,
      totalPages: 1
    }
  }

  async load(currentPage) {
    const catalog = await mainApi.getCatalog(currentPage);
    this.setState({
       ...this.getState(),
       list: catalog.items,
       count: catalog.count,
       totalPages: Math.ceil(catalog.count / this.getState().itemsPerView),
       currentPage: currentPage
    }, 'Загружены товары из АПИ');
  }

  setItemsPerView(itemsPerView) {
    this.setState({
      ... this.getState(),
      itemsPerView: itemsPerView
    }, 'Изменено количество отображаемых товаров на странице')
  }
}

export default Catalog;
