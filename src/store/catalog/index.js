import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      page: 1,
      count: null,
      list: []
    }
  }

  /**
   * Загрузка данных (id, title, price, count) с пагинацией
   * @param {String} page Номер страницы
   * @param {Number} PRODUCTS_PER_PAGE Количество товаров на странице
   */
  async load(page, PRODUCTS_PER_PAGE) {
    const response =
      await fetch(`/api/v1/articles?limit=${PRODUCTS_PER_PAGE}&skip=${(page - 1) * PRODUCTS_PER_PAGE}
        &fields=items(_id, title, price),count`);
    
    const json = await response.json();
    
    this.setState({
      ...this.getState(),
      page: Number(page),
      count: json.result.count,
      list: json.result.items,
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
