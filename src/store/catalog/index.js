import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      list: [],
      count: 0,
      totalPages: 1,
      currentPage: 1,
      pageSize: 10
    };
  }

  async load({page = 1, pageSize = 10, lang = 'ru'}) {

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
