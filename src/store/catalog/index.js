import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      list: [],
      itemsPerPage: 10,
      totalPages: 1,
      currentPage: 1,
      loading: 'idle',
    };
  }

  async load(page = this.getState().currentPage) {
    this.setState({
      ...this.getState(),
      loading: 'loading',
    });
    const baseUrl = '/api/v1/articles';
    const { itemsPerPage } = this.getState();
    const url = `${baseUrl}?limit=${itemsPerPage}&skip=${
      (page - 1) * itemsPerPage
    }&fields=items(_id,title,price),count`;
    try {
      const response = await fetch(url);
      const json = await response.json();
      const { items, count } = json.result;
      const totalPages = Math.ceil(count / itemsPerPage);

      this.setState(
        {
          ...this.getState(),
          list: items,
          totalPages,
          currentPage: page,
          loading: 'idle',
        },
        'Загружены товары из АПИ'
      );
    } catch (err) {
      this.setState(
        {
          ...this.getState(),
          loading: 'error',
          currentPage: page,
        },
        'Не удалось загрузить страницу каталога'
      );
    }
  }

  setCurrentPage(page) {
    console.log('here');
    this.setState({
      ...this.getState(),
      currentPage: page,
    });
  }
}

export default Catalog;
