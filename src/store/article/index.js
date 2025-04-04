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

  async load(articleId) {
    const response = await fetch(`/api/v1/articles/${articleId}?fields=name,title,description,price,edition,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        article: json.result,
      },
      `Загружен товар по id:${articleId} из АПИ`,
    );
  }
}

export default Article;
