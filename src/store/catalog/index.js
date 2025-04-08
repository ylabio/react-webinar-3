import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    const savedPage = localStorage.getItem('currentPage');

    return {
      list: [],
      count: 0,
      selectedProduct: null,
      currentPage: savedPage ? parseInt(savedPage) : 1,
      productsPerPage: 10,
    };
  }

  async load(params = {}) {
    const {
      currentPage = this.store.getState().catalog.currentPage,
      productsPerPage = this.store.getState().catalog.productsPerPage,
    } = params;
    localStorage.setItem('currentPage', currentPage);
    const skip = productsPerPage * (currentPage - 1);
    const lang = this.store.getState().language.lang;
    const response = await fetch(`/api/v1/articles?limit=${productsPerPage}&skip=${skip}&lang=${lang}`);
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        list: json.result?.items,
        currentPage,
      },
      'Загружены товары из АПИ',
    );
  }

  async getProductCount() {
    const response = await fetch('/api/v1/articles?fields=items(),count');
    const json = await response.json();
    
    this.setState({
      ...this.getState(),
      count: json.result.count,
    }, 'Загружены товары из АПИ с общим количеством товаров');
  };

  async getProduct(id) {
    const lang = this.store.getState().language.lang;
    const response = await fetch(`/api/v1/articles/${id}?fields=description,edition,price,title,madeIn(title),category(title)&lang=${lang}`);
    const json = await response.json();

    this.setState({
        ...this.getState(),
        list: [json.result],
        selectedProduct: json.result,
    });
  };

  setProductsPerPage(productsPerPage) {
    this.setState({
      ...this.getState(),
      productsPerPage: productsPerPage,
    }, 'Установка количества продуктов на одной странице');
  };
}

export default Catalog;
