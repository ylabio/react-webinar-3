import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(1);
  }

  initState() {
    // Получаем номер страницы из URL при инициализации
    const pageMatch = window.location.pathname.match(/\/page\/(\d+)/);
    const initialPage = pageMatch ? parseInt(pageMatch[1]) : 1;

    return {
      list: [],
      totalItems: 0,
      error: false,
      isLoading: false,
      currentPage: initialPage,
      limitItem: 10
    };
  }

  changePage(number) {
    this.setState({ ...this.getState(), currentPage: number });
    this.getFetch(this.getState().limitItem, number);
  }

  changeLimitItem(number) {
    this.setState({ ...this.getState(), limitItem: number, currentPage: 1 });
    this.getFetch(number, 1);
  }

  async load() {
    const state = this.getState();
    try {
      this.setState({
        ...state,
        isLoading: true,
      });
      const response = await fetch('/api/v1/articles?fields=items(*), count');

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      const json = await response.json();
      this.setState(
        {
          ...state,
          list: json.result.items,
          totalItems: json.result.count,
          error: false,
          isLoading: false,
        },
        'Загружены товары из АПИ',
      );
      
      // Загружаем правильную страницу после получения общего количества товаров
      if (state.currentPage > 1) {
        this.getFetch(state.limitItem, state.currentPage);
      }
    } catch (error) {
      console.error(error.message);
      this.setState({
        ...state,
        error: true,
        isLoading: false,
      });
    }
  }

  async getFetch(limit, page) {
    try {
      this.setState({
        ...this.getState(),
        isLoading: true,
      });
      const skip = (page - 1) * limit;
      const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}`);

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      const json = await response.json();
      this.setState(
        {
          ...this.getState(),
          list: json.result.items,
          error: false,
          isLoading: false,
        },
        'Загружены товары по странице ',
      );
    } catch (error) {
      console.error(error.message);
      this.setState({
        ...this.getState(),
        error: true,
        isLoading: false,
      });
    }
  }
}

export default Catalog;
