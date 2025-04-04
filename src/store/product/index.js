import StoreModule from '../module';
import { fetchData } from '../../api';

class Product extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.abortController = null;
  }

  initState() {
    return {
      item: {},
      category: null,
      country: {},
      loading: false,
      error: null,
    };
  }

  async load(id) {
    if (this.abortController) this.abortController.abort();

    this.abortController = new AbortController();
    const signal = this.abortController.signal;

    this.setState({ ...this.getState(), item: {}, loading: true, error: null });

    try {
      const paramsItem = encodeURI('fields=_id, title, description, price, madeIn(_id), edition, category(_id)');
      const paramsCategory = encodeURI('fields=_id, title');
      const paramsCountry = encodeURI('fields=_id, title, code');

      const item = await fetchData(
        `api/v1/articles/${id}?${paramsItem}`,
        signal
      );

      const category = await fetchData(
        `api/v1/categories/${item.result.category._id}?${paramsCategory}`,
        signal
      );

      const country = await fetchData(
        `api/v1/countries/${item.result.madeIn._id}?${paramsCountry}`,
        signal
      );

      this.setState(
        {
          ...this.getState(),
          item: item.result,
          category: category.result.title,
          country: country.result,
          loading: false,
        },
        'Загружены товар, категория и страна из АПИ',
      );

    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Запрос отменен');
      } else {
        console.error('Ошибка при загрузке данных:', error);
        this.setState({ ...this.getState(), loading: false, error: error.message }, 'Ошибка загрузки');
      }
    }
  }
}

export default Product;
