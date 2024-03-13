import {codeGenerator} from "../../utils";
import StoreModule from "../module";

const ITEMS_PER_PAGE = 10;

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      itemsCount: 0,
      pagesCount: 0,
      page: 1,
      isFetching: false,
      isSuccess: false
    }
  }

  /**
   * Получаем список товаров
   * @param page Номер страницы
   */
  async load(page = 1) {
    this.setState({
      ...this.getState(),
      isFetching: true
    }, 'Запрос товаров в АПИ');
    const response = await fetch(`/api/v1/articles?limit=${ITEMS_PER_PAGE}&skip=${(page - 1) * ITEMS_PER_PAGE}&fields=items(_id, title, price),count`);
    if (response.status === 200) {
      const json = await response.json();
      this.setState({
        ...this.getState(),
        list: json.result.items,
        itemsCount: json.result.count,
        pagesCount: Math.ceil(json.result.count / ITEMS_PER_PAGE),
        page,
        isFetching: false,
        isSuccess: true
      }, 'Загружены товары из АПИ');
    } else {
      this.setState({
        ...this.getState(),
        list: [],
        page,
        isFetching: false,
        isSuccess: false
      }, 'Ошибка загрузки товаров из АПИ');
    }
  }
}

export default Catalog;
