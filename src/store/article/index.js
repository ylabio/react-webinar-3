import StoreModule from '../module';

class Article extends StoreModule {
  initState() {
    return {
      article: {},
    };
  }

  async getArticleById(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=madeIn(title,code), category(title), edition, description, price`,);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        article: json.result,
      },
      'Загружен товар из АПИ',
    );
  }

}

export default Article;
