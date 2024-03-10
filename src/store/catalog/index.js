import StoreModule from "../module";
import { codeGenerator } from "../../utils";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
    this.currentPage = 0;
    this.limit = 10;
  }

  initState() {
    return {
      list: [],
      currentPage: this.currentPage,
    };
  }

  async load() {
    const currentPage = this.getState().currentPage;
    const skip = currentPage * this.limit; // Рассчитываем skip
    const response = await fetch(`/api/v1/articles?limit=${this.limit}&skip=${skip}&fields=items(_id, title, price),count`);
    const { result } = await response.json();
    const totalCount = result.count; // Общее количество элементов
    const lastPage = Math.ceil(totalCount / this.limit) - 1; // Пересчитываем lastPage
    this.setState(
      {
        ...this.getState(),
        list: result.items,
        lastPage: lastPage,
      },
      'Загружены товары из АПИ'
    );
  }
  // Функция загрузки товара по айди
  async loadById(id) {
    const response = await fetch(`/api/v1/articles/${id}`);
    const { result } = await response.json();
    this.setState({
      ...this.getState(),
      product: result
    }, 'Загружен товар из АПИ')
  }
  // Функция для изменения текущей страницы
  setCurrentPage(page) {
    this.setState(
      {
        ...this.getState(),
        currentPage: page,
      },
    );
  }
}

export default Catalog;
