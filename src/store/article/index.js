import StoreModule from "../module";

class Article extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      item: {
        _id: 0,
        title: '',
        description: '',
        madeIn: '',
        category: '',
        edition: 0,
        price: 0
      }
    }
  }

  async loadOne(articleId) {
    const response = await fetch(`/api/v1/articles/${articleId}?fields=*,madeIn(title,code),category(title)&lang=ru`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      item: {
        _id: json.result._id,
        title: json.result.title,
        description: json.result.description,
        madeIn: json.result.madeIn.title,
        category: json.result.category.title,
        edition: json.result.edition,
        price: json.result.price
      }
    }, 'Загружен товар из АПИ');
  }
}

export default Article;
