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
      limit: 10,
      page: 1,
      total: 0,
    };
  }

  async load(limit, page) {
    //Запрос для получения элементов
    const skip = (page - 1) * limit;
    const response = await fetch(
      `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id,title,price),count`,
    );
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        total: json.result.count,
      },
      'Загружены товары из АПИ',
    );
  }
}

export default Catalog;
