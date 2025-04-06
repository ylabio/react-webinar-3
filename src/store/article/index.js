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

  async load({id, lang}) {
    const response = await fetch(`/api/v1/articles/${id}?fields=title,description,price,edition,madeIn(title,code),category(title)&lang=${lang}`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        article: json.result,
      },
      `Загружена карточка товара по id:${id} из АПИ`,
    );
  }

  async clear() {
    await this.setState(
      {
        ...this.getState(),
        ...this.initState(),
      },
      `Очищена карточка товара`,
    );
  }


}

export default Article;
