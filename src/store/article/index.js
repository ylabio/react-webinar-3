import StoreModule from '../module';

class Article extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      data: {},
      isLoading: true,
    };
  }

  async load({id, lang}) {
    this.setState(
      {
        ...this.getState(),
        isLoading: true,
      },
      `Начинается загрузка карточки товара по id:${id} из АПИ`,
    );

    const response = await fetch(`/api/v1/articles/${id}?fields=title,description,price,edition,madeIn(title,code),category(title)&lang=${lang}`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        data: json.result,
        isLoading: false,
      },
      `Загружена карточка товара по id:${id} из АПИ`,
    );
  }

  clear() {
    this.setState(
      {
        ...this.getState(),
        ...this.initState(),
      },
      `Очищена карточка товара`,
    );
  }

}

export default Article;
