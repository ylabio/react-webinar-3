import StoreModule from '../module';

class Article extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      article: {},
    };
  }

  async getArticle(id = '670260bb7dd498df5525e5da') {
    const response = await fetch(
      `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        article: json.result,
      },
      'Загружен выбранный товар',
    );
  }
}

export default Article;
