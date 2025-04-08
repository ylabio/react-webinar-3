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
      currentPage: 0,
      maxPage: 0,
      limit: 10,
      language: 'RU',
    };
  }
  
  changeLanguage() {
    const newLanguage = this.getState().language === 'RU' ? 'EN' : 'RU';
    this.setState({ ...this.getState(), language: newLanguage }, 'Смена языка');
  }

  setPage(page) {
    this.setState({ ...this.getState(), currentPage: page }, 'Смена страницы');
  }

  setLimit(limit) {
    this.setState({ ...this.getState(), limit: limit }, 'Смена лимита');
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
