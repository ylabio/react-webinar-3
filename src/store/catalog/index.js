import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(1);
  }

  initState() {
    return {
      list: [],
      totalItems: 0,
      error: false,
      isLoading: false,
      currentPage: 1,
      limitItem: 10,
    };
  }

  async load(lang) {
    try {
      this.setState({
        ...this.getState(),
        isLoading: true,
      });
      const response = await fetch(`/api/v1/articles?fields=items(*), count&lang=${lang}`);
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      const json = await response.json();
      this.setState(
        {
          ...this.getState(),
          list: json.result.items,
          totalItems: json.result.count,
          error: false,
          isLoading: false,
        },
        'Загружены товары из АПИ',
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
  async getFetch(limit, page, lang) {
    try {
      this.setState({
        ...this.getState(),
        isLoading: true,
      });
      const skip = (page - 1) * limit;
      const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip};&lang=${lang}`);

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

  changePage(number) {
    this.setState({ ...this.getState(), currentPage: number });
  }

  changeLimitItem(number) {
    this.setState({ ...this.getState(), limitItem: number });
  }
}

export default Catalog;
