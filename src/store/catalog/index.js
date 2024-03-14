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
      loading: false,
      currentPage: 0,
      count: 0,
      totalPages: 0
    }
  }

  async load(page = 0) {
    try {
      this.setState({
        ...this.getState(),
        loading: true,
      }, 'Загрузка данных начата')

      const response = await fetch(`/api/v1/articles?limit=10${page > 0 ? `&skip=${page * 10}` : ''}`);
      const json = await response.json();
      this.setState({
        ...this.getState(),
        list: json.result.items,
      }, 'Загружены товары из АПИ');
    } catch (e) {
      console.error(e)
    } finally {
      this.setState({
        ...this.getState(),
        loading: false,
      }, 'Загрузка данных завершена')
    }
  }

  changePage(page) {
    this.setState({
      ...this.getState(),
      currentPage: page
    }, 'Изменена текущая страница')

    this.load(this.getState().currentPage)
  }

  async getCount() {
    const res = await fetch('/api/v1/articles?limit=10&skip=10&fields=items(_id, title, price),count')
    const json = await res.json()

    this.setState({
      ...this.getState(),
      count: json.result.count
    }, 'Получено количество всех товаров')
  }

  getTotalPages() {
    this.setState({
      ...this.getState(),
      totalPages: Math.ceil(this.getState().count / 10)
    }, 'Получено количество всех страниц')
  }
}

export default Catalog;
