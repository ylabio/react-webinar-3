import StoreModule from "../module";

class Article extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    console.log('called init state on article');
    return {
        item: {},
    }
  }

  async fetchArticle(id) {
    const response = await fetch(`/api/v1/articles/${id}`);
    const json = await response.json();
    this.setState({
      item: json.result,
    }, `Fetched item ${id}`);
  }
}

export default Article;
