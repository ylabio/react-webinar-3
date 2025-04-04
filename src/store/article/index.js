import StoreModule from '../module';

class Article extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      article: { _id: '' },
    };
  }

  async getArticle(id) {
    //Если выбранный товар уже загружен или не передан id, то не делаем ничего
    if (this.getState().article._id === id || !id) return;

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
