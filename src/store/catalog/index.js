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
      total: 0,
      isLoading: false,
      error: null
    };
  }

  async load({ limit = 10, skip = 0 } = {}) {
    this.setState({
      ...this.getState(),
      isLoading: true,
      error: null
    }, 'Начало загрузки товаров');

    try {
      const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}`);

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const json = await response.json();

      this.setState({
        ...this.getState(),
        list: json.result?.items || json.items || [],
        total: json.result?.total || json.total || 0,
        isLoading: false
      }, 'Успешно загружены товары из АПИ');

    } catch (error) {
      console.error('Ошибка при загрузке каталога:', error);
      this.setState({
        ...this.getState(),
        isLoading: false,
        error: error.message
      }, 'Ошибка загрузки товаров');
    }
  }
}

export default Catalog;
