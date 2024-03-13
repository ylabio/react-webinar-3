import StoreModule from "../module";

class Article extends StoreModule {

  initState() {
    return {
      list: undefined,
    }
  }

  async load(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result,
    }, 'Загружены 1 товар из АПИ');
  }
}

export default Article;
