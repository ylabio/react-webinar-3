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
      currentProduct: null, // Добавляем хранение текущего товара
      count: 0,
      page: 1,
      limit: 10,
      waiting: false,
    };
  }

  async load(params = {}) {
    const newParams = {
      page: this.getState().page,
      limit: this.getState().limit,
      ...params,
    };

    this.setState({
      ...this.getState(),
      ...newParams,
      waiting: true,
    });

    try {
      const skip = (newParams.page - 1) * newParams.limit;
      const response = await fetch(
        `/api/v1/articles?limit=${newParams.limit}&skip=${skip}&fields=items(_id,title,price),count`,
      );
      const json = await response.json();

      this.setState({
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
        waiting: false,
      });
    } catch (e) {
      this.setState({
        ...this.getState(),
        waiting: false,
      });
      console.error(e);
    }
  }

  /**
   * Загрузка конкретного товара по ID
   * @param id {string} - ID товара
   */
  async loadProduct(id) {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const response = await fetch(
        `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,
      );
      const json = await response.json();

      this.setState({
        ...this.getState(),
        currentProduct: json.result,
        waiting: false,
      });
    } catch (e) {
      this.setState({
        ...this.getState(),
        waiting: false,
      });
      console.error(e);
    }
  }

  setPage(page) {
    this.load({ page });
  }

  setLimit(limit) {
    this.load({ limit, page: 1 });
  }
}

export default Catalog;
