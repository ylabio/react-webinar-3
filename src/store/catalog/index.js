import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      limit: 10,
      numbersPages: [],
      page: 2,
      card: {},
      language: 'ru',
      multilingualism: {
        head : {
          title: {ru: 'Магазин', en: 'Shop'}
        },
        basketTool: {
          main: {ru: 'Главная', en: 'Main'},
          cart: {ru: 'В корзине', en: 'In the shopping cart'},
          empty: {ru: 'пусто', en: 'empty'},
          product: {ru: 'товар', en: 'product'},
          productTwo: {ru: 'товара', en: 'product'},
          products: {ru: 'товаров', en: 'products'},
          buttonGo: {ru: 'Перейти', en: 'Go over'}
        },
        item: {
          buttonAdd: {ru: 'Добавить', en: 'Add'}
        },
        modalLayout: {
          title: {ru: 'Корзина', en: 'Basket'},
          buttonclose: {ru: 'Закрыть', en: 'To close'}
        },
        itemBasket: {
          buttonRemove: {ru: 'Удалить', en: 'Remove'}},
        basketTotal: {
          total: {ru: 'Итого', en: 'Total'}
        },
        description: {
          country: {ru: 'Страна производитель', en: 'Country of origin'},
          category: {ru: 'Категория', en: 'Category'},
          year: {ru: 'Год выпуска', en: 'Year of release'},
          price: {ru: 'Цена', en: 'Price'},
          buttonAdd: {ru: 'Добавить', en: 'Add'},
        }
      }
    }
  }

  async load() {

    const limit = this.getState().limit;
    const skip = (this.getState().page - 1) * limit;
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`);
    const json = await response.json();
    const numbersPages = this.getNumbersPagesArray(json.result.count);

    this.setState({
      ...this.getState(),
      list: json.result.items,
      numbersPages: numbersPages
    }, 'Загружены товары из АПИ');
  }

  async loadById (id) {

    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
   
    const json = await response.json();

    this.setState({
      ...this.getState(),
      card: json.result,
    }, 'Загружен товар из АПИ');
  }

  /**
   * Считает номера страниц для отображения в кнопках
   * @param totalCount Всего товаров
   * @return [Array]
   */
  getNumbersPagesArray (totalCount) {

    const pagesArray = this.getPagesArray(totalCount, this.getState().limit);

    const page = this.getState().page;

    const numbersPages = [
      pagesArray[0],
      page - 1,
      page,
      page + 1,
      pagesArray[pagesArray.length - 1]
    ];

    if (page < 3) { 
        numbersPages[1] = pagesArray[1];
        numbersPages[2] = pagesArray[2];
        numbersPages[3] = false;
    } else if (page > pagesArray.length - 2) {
        numbersPages[2] = pagesArray.length - 2;
        numbersPages[3] = pagesArray.length - 1;
        numbersPages[1] = false;
    }

    return numbersPages;
  }

  /**
   * Считает общее количество страниц
   * @param totalCount Всего товаров
   * @param limit Количество товаров для вывода на 1 странице
   * @return [Array]
   */
  getPagesArray (totalCount, limit) {
    const totalPages = Math.ceil(totalCount / limit);
    let result = [];
    for (let i = 0; i < totalPages; i++) {
        result.push(i + 1);
    }
    return result;
  }

  /**
   * Переход на другую страницу
   * @param page Номер страницы для перехода
   */
  changePage (page)  {
    this.setState({
      ...this.getState(),
      page: page
    });
    this.load();
  }

  changeLanguage (language) {
   
    this.setState({
      ...this.getState(),
      language: [language]
    });
  }
}

export default Catalog;
