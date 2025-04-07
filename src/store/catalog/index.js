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
      article: {},
      count: 0,
      lang: 'ru',
    };
  }

  async load({ current = 1, perPage = 10 }) {
    console.log('Store lang-' + this.getState().lang)
    const response = await fetch(
      `/api/v1/articles?limit=${perPage}&skip=${(current - 1) * perPage}&lang=${this.getState().lang}&fields=items(_key, _id, title, price),count`,
    );
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
      },
      'Загружены товары из АПИ',
    );
  }

  async loadId(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=%2A&lang=${this.getState().lang}`);
    const json = await response.json();
    console.log('Catalog store--');
    console.log(this.getState());

    // this.setState(
    //   {
    //     ...this.getState(),
    //     article: json.result,
    //   },
    //   'Загружен товар по id',
    // );
    if (this.getState().count === 0) {
      const { _id, _key, price, title } = json.result;
      this.setState(
        {
          ...this.getState(),
          article: json.result,
          list: [{ _id, _key, price, title }],
        },
        'Загружен товар по id в чистую БД',
      );
    } else {
      this.setState(
        {
          ...this.getState(),
          article: json.result,
        },
        'Загружен товар по id',
      );
    }
  }

  setLang(lang) {
    this.setState({
      ...this.getState(),
      lang: lang,
    });
  }
}

export default Catalog;
