import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      totalPages: 0,
      currentPage: parseInt(localStorage.getItem('currentPage')) || 1,
      itemsPerPage: parseInt(localStorage.getItem('itemsPerPage')) || 10
    };
  }

  async load() {
    try {
      const state = this.getState();
      const skip = (state.currentPage - 1) * state.itemsPerPage;
      const itemsPerPage = state.itemsPerPage

      const response = await fetch(
        `/api/v1/articles?limit=${itemsPerPage}&skip=${skip}`
      );
      const json = await response.json();

      this.setState({
        ...state,
        list: json.result.items,
        totalPages: this.totalPages
      }, 'Товары загружены');
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    }
  }

  async getTotalCount() {
    try {
      const response = await fetch('/api/v1/articles?limit=1000,count');
      const json = await response.json();
      
      this.setState({
        ...this.getState(),
        totalItems: json.result.items.length
      }, 'Общее количество товаров');
    } catch (error) {
      console.error("Ошибка при получении общего количества:", error);
    }
  }

  setCurrentPage(page) {
    const pageNumber = Math.max(1, Number(page));
    localStorage.setItem('currentPage', pageNumber.toString());
    this.setState({ ...this.getState(), currentPage: pageNumber }, 'Смена страницы');
    this.load();
  }
  
  setItemsPerPage(itemsPerPage) {
    const perPage = Math.max(1, itemsPerPage);
    localStorage.setItem('itemsPerPage', perPage);
    this.setState({
      ...this.getState(),
      itemsPerPage: perPage,
      currentPage: 1
    }, 'Смена элементов на странице');
    this.load();
  }

  get skip() {
    return (this.getState().currentPage - 1) * this.getState().itemsPerPage;
  }
  
  get totalPages() {
    return Math.ceil(this.getState().totalItems / this.getState().itemsPerPage) || 1;
  }
}

export default Catalog;