import StoreModule from "../module";

class Article extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
        item: {},
    }
  }

  clearArticle() {
    this.setState({
      item: {},
    });
  }  

  async fetchArticle(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      item: json.result,
    }, `Fetched item ${id}`);
  }
}

export default Article;
