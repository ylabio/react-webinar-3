import StoreModule from "../module";

class Article extends StoreModule {

  initState() {
    return {
      item: null,
    }
  }

  async load(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`)
    const data = await response.json();
    this.setState({
      ...this.getState(),
      item: data.result,
    }, 'Загружен товар из АПИ')
  }
}

export default Article;