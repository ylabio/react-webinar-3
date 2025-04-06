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
      totalPages: 25,
      productsOnPage: 10,
      currentPage: 1,
      selectedProduct: null
    };
  }

  async load() {
    const {currentPage, productsOnPage} = this.getState()
    const skip = productsOnPage * (currentPage - 1)
    
    const response = await fetch(`/api/v1/articles?limit=${productsOnPage}&skip=${skip}`)
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
   * Изменение количества выводимых товаров на странице
   * @param newCount {Number} 
   */
  setProductsOnPage(newCount) {
    this.setState(
      {
        ...this.getState(),
        productsOnPage: newCount,
      },
      'Изменено количество отображаемых товаров'
    );
    this.load();
  }

  
  /**
   * Переход на новую страницу
   * @param newPage {Number} 
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
   * Загрузка подробной информации о товаре
   * @param productId {String} 
   */
  async loadProduct(productId) {
    const response = await fetch(`/api/v1/articles/${productId}?fields=*,madeIn(title,code),category(title)`)
    const json = await response.json()

    console.log(json)

    this.setState({
      ...this.getState(),
      selectedProduct: json.result
    }, 
    `Загружен товар с id: ${productId} из АПИ`)
  }
}

export default Catalog;
