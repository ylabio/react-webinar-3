import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
    this.PAGE_SIZE = 10; //кол-во товаров на странице
  }

  initState() {
    return {
      list: [],
      count: 0, //общее кол-во товаров
      currentPage: 1, // текущая стараница
    };
  }

  async load(page = 1) {
    const skip = (page - 1)*this.PAGE_SIZE; //смещение для АПИ + response - запрос нужных полей с параметрами пагинации
    const response = await fetch(`/api/v1/articles?limit=${this.PAGE_SIZE}&skip=${skip}&fields=items(_id,title,price),count`);
    //const response = await fetch('/api/v1/articles');
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
        currentPage: page
      },
      'Загружены товары из АПИ (страница ${page})',
    );
  }

  setPage(page) {
    this.load(page);
  }
}

export default Catalog;
