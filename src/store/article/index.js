import StoreModule from "../module";

class Article extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      article: {}
    }
  }

  async load(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      article: {
        ...this.getState().article,
        _id: json.result._id,
        title: json.result.title,
        description: json.result.description,
        price: json.result.price,
        edition: json.result.edition,
        country: json.result.madeIn.title,
        category: json.result.category.title
      }
    }, 'Загружен товар из АПИ');

    return {
        _id: json.result._id,
        title: json.result.title,
        price: json.result.price,
    }
  }
}

export default Article;
