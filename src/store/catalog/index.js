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
      productsPerPage: 10,
      currentPage: 1,
      totalPages: 1,
      currentProduct: null,
    };
  }

  async loadProduct(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title),description,edition`);
    const json = await response.json();
    
    this.setState({
      ...this.getState(),
      currentProduct: json.result,

    }, `Загружен товар ${id}`);
  }

  async load() {
    const { currentPage, productsPerPage } = this.getState();
    const skip = (currentPage - 1) * productsPerPage;

    const response = await fetch(`/api/v1/articles?limit=${productsPerPage}&skip=${skip}`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      'Загружены товары из АПИ',
    );

    this.setTotalPages();
  }

  setPage(newPage) {
    this.setState({
      ...this.getState(),
      currentPage: newPage,
    },
    "Текущая страница изменена");

    this.load();
  }

  setProductsPerPage(newCount) {
    this.setState({
      ...this.getState(),
      productsPerPage: newCount,
    },
      "Изменено количество выдаваемых товаров");

    this.load();
  }

  async setTotalPages() {
    const response = await fetch(`/api/v1/articles?limit=1&fields=items(),count`);
    const json = await response.json();
    const totalProducts = json.result.count;
    const limit = this.getState().productsPerPage;
    const totalPages = Math.ceil(totalProducts / limit);

    this.setState({
      ...this.getState(),
      totalPages: totalPages,
    },
      "Изменено количество страниц с поправкой на количество отображаемых товаров");
  }
}

export default Catalog;
