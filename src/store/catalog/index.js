import {codeGenerator} from '../../utils';
import StoreModule from '../module';

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
      page: 1,
      card: {},
      loading: false
    }
  }

  async load() {

    this.setState({
      ...this.getState(),
      loading: true,
    })

    const limit = this.getState().limit;
    const skip = (this.getState().page - 1) * limit;
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`);
    const json = await response.json();
    const numbersPages = this.getNumbersPagesArray(json.result.count);

    this.setState({
      ...this.getState(),
      list: json.result.items,
      numbersPages: numbersPages,
      loading: false,
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
      {_id: 0, page: pagesArray[0]},
      {_id: 1, page: page - 1},
      {_id: 2, page: page},
      {_id: 3, page: page + 1},
      {_id: 4, page: pagesArray[pagesArray.length - 1]}
    ];

    if (page < 3) { 
        numbersPages[1].page = pagesArray[1];
        numbersPages[2].page = pagesArray[2];
        numbersPages[3].page = false;
    } else if (page > pagesArray.length - 2) {
        numbersPages[2].page = pagesArray.length - 2;
        numbersPages[3].page = pagesArray.length - 1;
        numbersPages[1].page = false;
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

}

export default Catalog;
