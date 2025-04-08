import StoreModule from '../module';
import {DEFAULT_PAGINATION} from "../../constants";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      list: [],
      count: DEFAULT_PAGINATION.count,
      skip: DEFAULT_PAGINATION.skip,
      limit: DEFAULT_PAGINATION.pageSize,
    };
  }

  async load({skip, limit, lang = 'ru'}) {

    const response = await fetch(`/api/v1/articles?sort=order&limit=${limit}&skip=${skip}&lang=${lang}&fields=items(_id, title, price),count`);
    const json = await response.json();

    const count = json.result.count;

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count,
        skip,
        limit
      },
      'Загружены товары из АПИ',
    );
  }

}

export default Catalog;
