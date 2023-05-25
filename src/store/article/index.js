import StoreModule from "../module";

class Article extends StoreModule {

  initState() {
    return {
      fields: {},
      loading: false
    };
  }

  async load(id) {
    this.setState({
      ...this.getState(),
      loading: true
    }, 'Загрузка описания товара ' + id);
    const response = await fetch(`api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      fields: json.result,
      loading: false
    }, 'Загружено описание товара ' + id);
  }
}

export default Article;