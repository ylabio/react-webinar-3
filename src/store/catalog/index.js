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
      count: 0,
      isLoading: false,
    };
  }

  async load(url) {
    this.setState({ ...this.getState(), isLoading: true }, 'Начало загрузки');
    try {
      const response = await fetch(url);
      const json = await response.json();
      
      this.setState({
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
        isLoading: false,
      }, 'Загружены товары из АПИ');
    } catch (error) {
      this.setState({ ...this.getState(), isLoading: false, error }, 'Ошибка загрузки');
      throw error;
    }
  }
}

export default Catalog;
