import { codeGenerator } from '../../utils';
import StoreModule from '../module';
import { fetchData } from '../../api';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
    this.abortController = null;
  }

  initState() {
    return {
      list: [],
      count: 0,
      limit: 10,
      loading: false,
      error: null,
    };
  }

  setLimit(limit) {
    this.setState(
      {
        ...this.getState(),
        limit: limit,
      },
    )
  }

  async load(limit, skip) {
    if (this.abortController) this.abortController.abort();

    this.abortController = new AbortController();
    const signal = this.abortController.signal;

    this.setState({ ...this.getState(), list: [], loading: true, error: null });

    const params = encodeURI('fields=items(_id, title, price),count');

    try {
      const json = await fetchData(`/api/v1/articles?limit=${limit}&skip=${skip}&${params}`, signal);

      this.setState(
        {
          ...this.getState(),
          list: json.result.items,
          count: json.result.count,
          loading: false,
        },
        'Загружены товары из АПИ',
      );
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Запрос отменен');
      } else {
        console.error('Ошибка при загрузке данных:', error);
        this.setState({ ...this.getState(), loading: false, error: error.message });
      }
    }
  }
}

export default Catalog;
