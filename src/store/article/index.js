import StoreModule from '../module';

class Article extends StoreModule {
  initState() {
    return {
      item: {},
    };
  }

  async load(id) {
    //Запрос для получения товара по ID
    const response = await fetch(
      `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,
    );
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        item: json.result,
      },
      'Загружен товар из АПИ по ID',
    );
  }
}

export default Article;
