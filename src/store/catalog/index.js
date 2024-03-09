import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      count: 0,
      limit: 10,
      list: [],
      isLoading: false,
      pageNumber: 1,
      error: false
    }
  }

  /**
   * Запрос списка товаров и количества товаров к АПИ
   * @param pageNumber число, номер текущей страницы в каталоге
   */
  async loadWithParams(pageNumber) {
    const skipItems = pageNumber === 1 ? 0 : (pageNumber - 1) * this.getState().limit;

    this.setState({
      ...this.getState(),
      isLoading: true,
      pageNumber: pageNumber
    })

    try {
      const response = await fetch(`/api/v1/articles?limit=${this.getState().limit}&skip=${skipItems}&fields=items(_id, title, price),count`);
      const json = await response.json();
      this.setState({
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
        isLoading: false,
      }, 'Загружены товары из АПИ');
    } catch(error) {
      this.setState({
        ...this.getState(),
        isLoading: false,
        error: true
      }, `Товары не загружены из АПИ. Ошибка: ${error}`)
    }
  }
}

export default Catalog;
