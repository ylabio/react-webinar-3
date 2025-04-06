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
      currentPage: 1,
      limit: 10,
      currentPage: 1,
      totalPages: 25,
      selectedProduct: null,
    };
  }

  async load() {
    const { currentPage, limit } = this.getState();
    const skip = (currentPage - 1) * limit;

    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      'Загружены товары из АПИ',
    );
  }

  /**
   * 
   * Получение подробной инфы о продукте {Number} 
   */
  async getProduct(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=description,edition,price,title,madeIn(title),category(title)`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        selectedProduct: json.result,
      },
      'Загружены товары из АПИ',
    )
  }

  /**
   * 
   * Переход на новую страницу {Number} 
   */
  setPage(newPage) {
    this.setState(
      {
        ...this.getState(),
        currentPage: newPage,
      },
      'Изменена текущая страница'
    );
    this.load();
  }

  /**
   * 
   * Изменение количества выводимых товаров в списке {Number} 
   */
  setLimit(newCount) {
    this.setState(
      {
        ...this.getState(),
        limit: newCount,
      },
      'Изменено количество отображаемых товаров'
    );
    this.load();
  }
}

export default Catalog;
