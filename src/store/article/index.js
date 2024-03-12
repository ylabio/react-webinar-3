import StoreModule from "../module";

class Article extends StoreModule {

  initState() {
    return {
      data: {},
      isLoad: false
    }
  }

  async loadArticle(id) {
    this.setState({
      ...this.getState(),
      isLoad: true,
    }, 'Загружается товар...');
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      data: json.result,
      isLoad: false
    }, 'Загружен товар по id из АПИ');
  }
}

export default Article;
