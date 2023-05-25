import StoreModule from "../module";

class Article extends StoreModule {

  initState() {
    return {
      fields: {}
    };
  }

  async load(id) {
    //http://example.front.ylab.io/api/v1/articles/646b6e1fe1626c0bd8518064?fields=*,madeIn(title,code),category(title)
    const response = await fetch(`api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      fields: json.result
    }, 'Загружено описание товара ' + id);
  }
}

export default Article;