import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
    this.PAGE_SIZES = [5, 10, 20]; //кол-во товаров на странице
  }

  initState() {
    return {
      list: [],
      count: 0, //общее кол-во товаров
      currentPage: 1, // текущая стараница
      pageSize: 10, // кол-во элементов по умолчанию
      availableSizes: this.PAGE_SIZES,
      productPage: { // отдельный стейт для страницы товара
        product: null,
        isLoading: false,
        error: null
      }
    };
  }

  async loadProduct(id) {

    this.setState({
      ...this.getState(),
      productPage: {
        ...this.getState().productPage,
        isLoading: true,
        error: null
      }
    }, `Загрузка товара ${id}`);

    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title),description,edition`);
      const json = await response.json();
      
      this.setState({
        ...this.getState(),
        productPage: {
          product: json.result,
          isLoading: false,
          error: null
        }
      }, `Товар ${id} успешно загружен`);
    }
    
    catch (error) {
      this.setState({
        ...this.getState(),
        productPage: {
          product: null,
          isLoading: false,
          error: error.message
        }
      }, `Ошибка загрузки товара ${id}`);
    }
  }

  async load(page = this.getState().currentPage) {
    const pageSize = this.getState().pageSize;
    const skip = (page - 1) * pageSize;
    const response = await fetch(`/api/v1/articles?limit=${pageSize}&skip=${skip}&fields=items(_id,title,price),count`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
        currentPage: page,
      },
      `Загружены товары из АПИ (страница ${page}, размер ${pageSize})`,
    );
  }

  setPage(page) {
    this.load(page);
  }

  // метод для изменения размера страницы
  setPageSize(size) {
    if (this.PAGE_SIZES.includes(size)) {
      this.setState(
        {
          ...this.getState(),
          pageSize: size,
          currentPage: 1, // Сбрасываем на первую страницу при изменении размера
        },
        `Изменение размера страницы на ${size}`,
      );
      this.load(1); // Перезагружаем данные с новым размером страницы
    }
  }
}

export default Catalog;
