import StoreModule from '../module';
import {DEFAULT_PAGINATION} from "../../constants";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      list: [],
      count: 0,
      totalPages: DEFAULT_PAGINATION.totalPages,
      currentPage: DEFAULT_PAGINATION.currentPage,
      pageSize: DEFAULT_PAGINATION.pageSize,
    };
  }

  async load({page = DEFAULT_PAGINATION.currentPage, pageSize = DEFAULT_PAGINATION.pageSize, lang = 'ru'}) {

    const skip = (page - 1) * pageSize;

    const response = await fetch(`/api/v1/articles?sort=order&limit=${pageSize}&skip=${skip}&lang=${lang}&fields=items(_id, title, price),count`);
    const json = await response.json();

    const count = json.result.count;
    const currentPage = Math.floor(skip / pageSize) + 1;
    const totalPages = Math.ceil(count / pageSize);

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count,
        currentPage,
        totalPages,
        pageSize,
      },
      'Загружены товары из АПИ',
    );
  }

}

export default Catalog;
